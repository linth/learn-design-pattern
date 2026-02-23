"use strict";
// src/configs/adapter.config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqttToTalqConfig = exports.modbusToMqttConfig = exports.mqttToModbusConfig = void 0;
exports.mqttToModbusConfig = {
    subscribeTopic: 'device/control/+/temperature', // '+' 是 MQTT wild card，表示匹配任何設備 ID
    transformConfig: {
        valueKey: 'value', // 從 MQTT payload { "value": 25 } 中提取
        slaveId: 1,
        address: 0,
        type: 'singleRegister'
    }
};
exports.modbusToMqttConfig = {
    slaveId: 1,
    address: 0,
    quantity: 1,
    pollingIntervalMs: 5000, // 每 5 秒讀取一次
    transformConfig: {
        topic: 'device/status/temperature',
        valueKey: 'temperatureC', // 將 Modbus 值映射到 MQTT JSON 的鍵
    }
};
exports.mqttToTalqConfig = {
    subscribeTopic: 'talq/command/light/#', // '#' 是 MQTT wild card，表示匹配所有後續子主題
    transformConfig: {
        messageType: 'Command',
        senderId: 'mqttGateway001',
        receiverIdKey: 'deviceId', // 從 MQTT payload { "deviceId": "light001", ... } 中提取
        commandKey: 'action', // 從 MQTT payload { "action": "turnOn", ... } 中提取
        dataKey: 'parameters' // 從 MQTT payload { "parameters": { "brightness": 100 } } 中提取
    }
};
// 您可以定義更多類似的配置對象，每個都代表一個特定的轉換情境
