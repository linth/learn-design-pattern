"use strict";
// src/transformations/MqttToModbusValueTransformer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttToModbusValueTransformer = void 0;
class MqttToModbusValueTransformer {
    transform(message, config) {
        try {
            const payload = JSON.parse(message.payload.toString());
            const value = payload[config.valueKey];
            if (typeof value === 'undefined' || value === null) {
                throw new Error(`Value for key '${config.valueKey}' not found in MQTT payload.`);
            }
            let registers = [];
            if (config.type === 'singleRegister') {
                // 簡單轉換，假設值可以直接作為 ModbusRegister
                registers = [value];
            }
            else if (config.type === 'multipleRegisters') {
                // 這裡需要更複雜的邏輯來將 JS 數字或字符串轉換為 Modbus 暫存器陣列
                // 假設 value 是一個數字陣列，每個元素都是一個 ModbusRegister
                if (!Array.isArray(value)) {
                    throw new Error(`Expected array for multiple registers, but got ${typeof value}.`);
                }
                registers = value.map(v => v);
            }
            else {
                throw new Error(`Unsupported Modbus type: ${config.type}`);
            }
            console.log(`[MqttToModbusValueTransformer] Transformed MQTT payload for topic "${message.topic}" to Modbus: slaveId=${config.slaveId}, address=${config.address}, values=${JSON.stringify(registers)}`);
            return {
                slaveId: config.slaveId,
                address: config.address,
                values: registers
            };
        }
        catch (error) {
            console.error(`[MqttToModbusValueTransformer] Error transforming MQTT message for topic "${message.topic}":`, error);
            throw error;
        }
    }
}
exports.MqttToModbusValueTransformer = MqttToModbusValueTransformer;
