"use strict";
// src/adapters/MqttToModbusAdapter.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttToModbusAdapter = void 0;
class MqttToModbusAdapter {
    constructor(mqttClient, modbusClient, transformer, config) {
        this.mqttClient = mqttClient;
        this.modbusClient = modbusClient;
        this.transformer = transformer;
        this.config = config;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mqttClient.connect();
            yield this.modbusClient.connect();
            yield this.mqttClient.subscribe(this.config.subscribeTopic);
            console.log(`[MqttToModbusAdapter] Subscribed to MQTT topic: ${this.config.subscribeTopic}`);
            this.mqttClient.onMessage(this.handleMqttMessage.bind(this));
            console.log('[MqttToModbusAdapter] Adapter started, listening for MQTT messages.');
        });
    }
    handleMqttMessage(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[MqttToModbusAdapter] Received MQTT message on topic "${topic}".`);
            try {
                const modbusWriteData = this.transformer.transform({ topic, payload }, this.config.transformConfig);
                // 根據轉換結果執行 Modbus 寫操作
                if (modbusWriteData.values.length === 1) {
                    yield this.modbusClient.writeSingleRegister(modbusWriteData.slaveId, modbusWriteData.address, modbusWriteData.values[0]);
                    console.log(`[MqttToModbusAdapter] Successfully wrote single Modbus register.`);
                }
                else if (modbusWriteData.values.length > 1) {
                    yield this.modbusClient.writeMultipleRegisters(modbusWriteData.slaveId, modbusWriteData.address, modbusWriteData.values);
                    console.log(`[MqttToModbusAdapter] Successfully wrote multiple Modbus registers.`);
                }
                else {
                    console.warn(`[MqttToModbusAdapter] No values to write to Modbus for topic "${topic}".`);
                }
            }
            catch (error) {
                console.error(`[MqttToModbusAdapter] Error processing MQTT message for topic "${topic}":`, error);
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MqttToModbusAdapter] Stopping adapter...');
            // 在實際應用中，可能需要取消訂閱
            yield this.mqttClient.disconnect();
            yield this.modbusClient.disconnect();
            console.log('[MqttToModbusAdapter] Adapter stopped.');
        });
    }
}
exports.MqttToModbusAdapter = MqttToModbusAdapter;
