// src/main.ts

// import { MockMqttClient } from './clients/MqttClient';
import { MockModbusClient } from './clients/ModbusClient';
import { MockTalqClient } from './clients/TalqClient';

import { MqttToModbusAdapter } from './adapters/MqttToModbusAdapter';
import { ModbusToMqttAdapter } from './adapters/ModbusToMqttAdapter';
import { MqttToTalqAdapter } from './adapters/MqttToTalqAdapter';

import { MqttToModbusValueTransformer } from './transformations/MqttToModbusValueTransformer';
import { ModbusToMqttJsonTransformer } from './transformations/ModbusToMqttJsonTransformer';
import { MqttToTalqMessageTransformer } from './transformations/MqttToTalqMessageTransformer';

import { mqttToModbusConfig, modbusToMqttConfig, mqttToTalqConfig } from './configs/adapter.config';
import { MockMqttClient } from './clients/ModbusClient'; // './clients/mqttClient';

async function bootstrap() {
    console.log('Starting protocol adapters...');

    // 實例化客戶端
    const mqttClient = new MockMqttClient();
    const modbusClient = new MockModbusClient();
    const talqClient = new MockTalqClient();

    // 實例化資料轉換策略
    const mqttToModbusTransformer = new MqttToModbusValueTransformer();
    const modbusToMqttTransformer = new ModbusToMqttJsonTransformer();
    const mqttToTalqTransformer = new MqttToTalqMessageTransformer();

    // 創建適配器實例
    const mqttToModbusAdapter = new MqttToModbusAdapter(
        mqttClient,
        modbusClient,
        mqttToModbusTransformer,
        mqttToModbusConfig
    );

    const modbusToMqttAdapter = new ModbusToMqttAdapter(
        modbusClient,
        mqttClient,
        modbusToMqttTransformer,
        modbusToMqttConfig
    );

    const mqttToTalqAdapter = new MqttToTalqAdapter(
        mqttClient,
        talqClient,
        mqttToTalqTransformer,
        mqttToTalqConfig
    );

    try {
        // 啟動所有適配器
        await mqttToModbusAdapter.start();
        await modbusToMqttAdapter.start();
        await mqttToTalqAdapter.start();

        console.log('\nAll adapters initialized and started. Simulating data flow...\n');

        // --- 模擬數據流 ---

        // 1. 模擬 MQTT -> Modbus (控制燈光溫度)
        console.log('--- Simulating MQTT to Modbus (e.g., set device temperature) ---');
        mqttClient.simulateIncomingMessage(
            'device/control/thermostat001/temperature',
            JSON.stringify({ value: 25 })
        );
        await new Promise(resolve => setTimeout(resolve, 500)); // 等待處理

        // 2. 模擬 Modbus -> MQTT (讀取傳感器數據並發布)
        console.log('\n--- Simulating Modbus to MQTT (e.g., poll sensor data) ---');
        // ModbusToMqttAdapter 會每隔 pollingIntervalMs 自動讀取和發布
        await new Promise(resolve => setTimeout(resolve, modbusToMqttConfig.pollingIntervalMs + 200)); // 等待至少一次輪詢

        // 3. 模擬 MQTT -> TALQ (發送路燈開關命令)
        console.log('\n--- Simulating MQTT to TALQ (e.g., send smart city command) ---');
        mqttClient.simulateIncomingMessage(
            'talq/command/light/light001',
            JSON.stringify({
                deviceId: 'light001',
                action: 'turnOn',
                parameters: { brightness: 80 }
            })
        );
        await new Promise(resolve => setTimeout(resolve, 500)); // 等待處理


        console.log('\n--- Simulation complete. Stopping adapters in 5 seconds... ---');
        await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (error) {
        console.error('An error occurred during adapter operation:', error);
    } finally {
        // 停止所有適配器
        await mqttToModbusAdapter.stop();
        await modbusToMqttAdapter.stop();
        await mqttToTalqAdapter.stop();
        console.log('All adapters stopped.');
    }
}

bootstrap();