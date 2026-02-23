// src/transformations/MqttToModbusValueTransformer.ts

import { IMqttToModbusValueTransformer, IMqttMessage } from '../interfaces/transform.interface';
import { ModbusRegister, ModbusRegisters } from '../interfaces/modbus.interface';

/**
 * 配置範例：
 * {
 * "valueKey": "temperature", // 從 MQTT JSON payload 中提取哪個鍵的值
 * "slaveId": 1,
 * "address": 0,
 * "type": "singleRegister" // "singleRegister" 或 "multipleRegisters"
 * }
 */
export interface MqttToModbusTransformConfig {
  valueKey: string;
  slaveId: number;
  address: number;
  type: 'singleRegister' | 'multipleRegisters';
  // 更多轉換規則，例如縮放、偏移等
}

export class MqttToModbusValueTransformer implements IMqttToModbusValueTransformer {
  transform(message: IMqttMessage, config: MqttToModbusTransformConfig): { slaveId: number, address: number, values: ModbusRegisters } {
    try {
      const payload = JSON.parse(message.payload.toString());
      const value = payload[config.valueKey];

      if (typeof value === 'undefined' || value === null) {
        throw new Error(`Value for key '${config.valueKey}' not found in MQTT payload.`);
      }

      let registers: ModbusRegisters = [];
      if (config.type === 'singleRegister') {
        // 簡單轉換，假設值可以直接作為 ModbusRegister
        registers = [value as ModbusRegister];
      } else if (config.type === 'multipleRegisters') {
        // 這裡需要更複雜的邏輯來將 JS 數字或字符串轉換為 Modbus 暫存器陣列
        // 假設 value 是一個數字陣列，每個元素都是一個 ModbusRegister
        if (!Array.isArray(value)) {
          throw new Error(`Expected array for multiple registers, but got ${typeof value}.`);
        }
        registers = value.map(v => v as ModbusRegister);
          } else {
              throw new Error(`Unsupported Modbus type: ${config.type}`);
          }

          console.log(`[MqttToModbusValueTransformer] Transformed MQTT payload for topic "${message.topic}" to Modbus: slaveId=${config.slaveId}, address=${config.address}, values=${JSON.stringify(registers)}`);
          return {
              slaveId: config.slaveId,
              address: config.address,
              values: registers
          };
      } catch (error) {
          console.error(`[MqttToModbusValueTransformer] Error transforming MQTT message for topic "${message.topic}":`, error);
          throw error;
      }
  }
}