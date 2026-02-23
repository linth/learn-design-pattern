"use strict";
// src/transformations/ModbusToMqttJsonTransformer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModbusToMqttJsonTransformer = void 0;
class ModbusToMqttJsonTransformer {
    transform(modbusData, config) {
        var _a, _b;
        const { slaveId, address, values } = modbusData;
        const offset = (_a = config.offset) !== null && _a !== void 0 ? _a : 0;
        let quantity = (_b = config.quantity) !== null && _b !== void 0 ? _b : values.length; // 默認轉換所有值
        if (offset + quantity > values.length) {
            console.warn(`[ModbusToMqttJsonTransformer] Requested quantity (${quantity}) exceeds available values from offset (${offset}). Adjusting quantity.`);
            quantity = values.length - offset;
        }
        const extractedValues = values.slice(offset, offset + quantity);
        const payloadObject = {
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
exports.ModbusToMqttJsonTransformer = ModbusToMqttJsonTransformer;
