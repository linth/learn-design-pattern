"use strict";
// src/main.ts
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
// import { MockMqttClient } from './clients/MqttClient';
const ModbusClient_1 = require("./clients/ModbusClient");
const TalqClient_1 = require("./clients/TalqClient");
const MqttToModbusAdapter_1 = require("./adapters/MqttToModbusAdapter");
const ModbusToMqttAdapter_1 = require("./adapters/ModbusToMqttAdapter");
const MqttToTalqAdapter_1 = require("./adapters/MqttToTalqAdapter");
const MqttToModbusValueTransformer_1 = require("./transformations/MqttToModbusValueTransformer");
const ModbusToMqttJsonTransformer_1 = require("./transformations/ModbusToMqttJsonTransformer");
const MqttToTalqMessageTransformer_1 = require("./transformations/MqttToTalqMessageTransformer");
const adapter_config_1 = require("./configs/adapter.config");
const ModbusClient_2 = require("./clients/ModbusClient"); // './clients/mqttClient';
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting protocol adapters...');
        // 實例化客戶端
        const mqttClient = new ModbusClient_2.MockMqttClient();
        const modbusClient = new ModbusClient_1.MockModbusClient();
        const talqClient = new TalqClient_1.MockTalqClient();
        // 實例化資料轉換策略
        const mqttToModbusTransformer = new MqttToModbusValueTransformer_1.MqttToModbusValueTransformer();
        const modbusToMqttTransformer = new ModbusToMqttJsonTransformer_1.ModbusToMqttJsonTransformer();
        const mqttToTalqTransformer = new MqttToTalqMessageTransformer_1.MqttToTalqMessageTransformer();
        // 創建適配器實例
        const mqttToModbusAdapter = new MqttToModbusAdapter_1.MqttToModbusAdapter(mqttClient, modbusClient, mqttToModbusTransformer, adapter_config_1.mqttToModbusConfig);
        const modbusToMqttAdapter = new ModbusToMqttAdapter_1.ModbusToMqttAdapter(modbusClient, mqttClient, modbusToMqttTransformer, adapter_config_1.modbusToMqttConfig);
        const mqttToTalqAdapter = new MqttToTalqAdapter_1.MqttToTalqAdapter(mqttClient, talqClient, mqttToTalqTransformer, adapter_config_1.mqttToTalqConfig);
        try {
            // 啟動所有適配器
            yield mqttToModbusAdapter.start();
            yield modbusToMqttAdapter.start();
            yield mqttToTalqAdapter.start();
            console.log('\nAll adapters initialized and started. Simulating data flow...\n');
            // --- 模擬數據流 ---
            // 1. 模擬 MQTT -> Modbus (控制燈光溫度)
            console.log('--- Simulating MQTT to Modbus (e.g., set device temperature) ---');
            mqttClient.simulateIncomingMessage('device/control/thermostat001/temperature', JSON.stringify({ value: 25 }));
            yield new Promise(resolve => setTimeout(resolve, 500)); // 等待處理
            // 2. 模擬 Modbus -> MQTT (讀取傳感器數據並發布)
            console.log('\n--- Simulating Modbus to MQTT (e.g., poll sensor data) ---');
            // ModbusToMqttAdapter 會每隔 pollingIntervalMs 自動讀取和發布
            yield new Promise(resolve => setTimeout(resolve, adapter_config_1.modbusToMqttConfig.pollingIntervalMs + 200)); // 等待至少一次輪詢
            // 3. 模擬 MQTT -> TALQ (發送路燈開關命令)
            console.log('\n--- Simulating MQTT to TALQ (e.g., send smart city command) ---');
            mqttClient.simulateIncomingMessage('talq/command/light/light001', JSON.stringify({
                deviceId: 'light001',
                action: 'turnOn',
                parameters: { brightness: 80 }
            }));
            yield new Promise(resolve => setTimeout(resolve, 500)); // 等待處理
            console.log('\n--- Simulation complete. Stopping adapters in 5 seconds... ---');
            yield new Promise(resolve => setTimeout(resolve, 5000));
        }
        catch (error) {
            console.error('An error occurred during adapter operation:', error);
        }
        finally {
            // 停止所有適配器
            yield mqttToModbusAdapter.stop();
            yield modbusToMqttAdapter.stop();
            yield mqttToTalqAdapter.stop();
            console.log('All adapters stopped.');
        }
    });
}
bootstrap();
