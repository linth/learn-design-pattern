// src/transformations/ModbusToMqttJsonTransformer.ts

import { IModbusToMqttJsonTransformer, IMqttMessage, ModbusRegisters } from '../interfaces/transform.interface';

/**
 * 配置範例：
 * {
 * "topic": "sensor/data/temperature",
 * "valueKey": "temperature", // 在 MQTT JSON payload 中使用的鍵
 * "offset": 0, // 從 ModbusRegisters 陣列中取值的起始偏移
 * "quantity": 1 // 從 ModbusRegisters 陣列中取值的數量
 * // 更多轉換規則，例如縮放、單位轉換等
 * }
 */
export interface ModbusToMqttTransformConfig {
    topic: string;
    valueKey: string;
    offset?: number;
    quantity?: number;
    // ... 其他轉換規則
}

export class ModbusToMqttJsonTransformer implements IModbusToMqttJsonTransformer {
  transform(modbusData: { slaveId: number, address: number, values: ModbusRegisters }, config: ModbusToMqttTransformConfig): IMqttMessage {
    const { slaveId, address, values } = modbusData;
    const offset = config.offset ?? 0;
    let quantity = config.quantity ?? values.length; // 默認轉換所有值

    if (offset + quantity > values.length) {
      console.warn(`[ModbusToMqttJsonTransformer] Requested quantity (${quantity}) exceeds available values from offset (${offset}). Adjusting quantity.`);
      quantity = values.length - offset;
    }

    const extractedValues = values.slice(offset, offset + quantity);

    const payloadObject: { [key: string]: any } = {
      slaveId: slaveId,
      address: address,
      rawValue: extractedValues.length === 1 ? extractedValues[0] : extractedValues, // 如果只有一個值，直接賦值
      timestamp: new Date().toISOString()
    };

    // 如果配置了 valueKey，將提取的值放在該鍵下
    if (config.valueKey) {
      payloadObject[config.valueKey] = extractedValues.length === 1 ? extractedValues[0] : extractedValues;
    }

    const payload = Buffer.from(JSON.stringify(payloadObject));

    console.log(`[ModbusToMqttJsonTransformer] Transformed Modbus data from slaveId ${slaveId}, address ${address} to MQTT: topic="${config.topic}", payload=${payload.toString()}`);
    return {
      topic: config.topic,
      payload: payload
    };
  }
}