"use strict";
// src/adapters/ModbusToMqttAdapter.ts
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
exports.ModbusToMqttAdapter = void 0;
class ModbusToMqttAdapter {
    constructor(modbusClient, mqttClient, transformer, config) {
        this.pollingTimer = null;
        this.modbusClient = modbusClient;
        this.mqttClient = mqttClient;
        this.transformer = transformer;
        this.config = config;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.modbusClient.connect();
            yield this.mqttClient.connect();
            this.pollingTimer = setInterval(this.pollModbusAndPublish.bind(this), this.config.pollingIntervalMs);
            console.log(`[ModbusToMqttAdapter] Adapter started, polling Modbus every ${this.config.pollingIntervalMs}ms.`);
        });
    }
    pollModbusAndPublish() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[ModbusToMqttAdapter] Polling Modbus: slaveId=${this.config.slaveId}, address=${this.config.address}, quantity=${this.config.quantity}`);
            try {
                const registers = yield this.modbusClient.readHoldingRegisters(this.config.slaveId, this.config.address, this.config.quantity);
                const mqttMessage = this.transformer.transform({ slaveId: this.config.slaveId, address: this.config.address, values: registers }, this.config.transformConfig);
                yield this.mqttClient.publish(mqttMessage);
                console.log(`[ModbusToMqttAdapter] Successfully published Modbus data to MQTT topic: ${mqttMessage.topic}`);
            }
            catch (error) {
                console.error(`[ModbusToMqttAdapter] Error polling Modbus or publishing to MQTT:`, error);
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[ModbusToMqttAdapter] Stopping adapter...');
            if (this.pollingTimer) {
                clearInterval(this.pollingTimer);
                this.pollingTimer = null;
            }
            yield this.mqttClient.disconnect();
            yield this.modbusClient.disconnect();
            console.log('[ModbusToMqttAdapter] Adapter stopped.');
        });
    }
}
exports.ModbusToMqttAdapter = ModbusToMqttAdapter;
