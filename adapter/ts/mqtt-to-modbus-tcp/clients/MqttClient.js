"use strict";
// src/clients/MqttClient.ts
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
exports.MockMqttClient = void 0;
const events_1 = require("events"); // 用於模擬訊息事件
class MockMqttClient extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.isConnected = false;
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[MockMqttClient] Connecting... (options: ${JSON.stringify(options || {})})`);
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = true;
                console.log('[MockMqttClient] Connected.');
                resolve();
            }, 100));
        });
    }
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                console.warn('[MockMqttClient] Not connected, cannot publish.');
                return;
            }
            const payloadString = message.payload instanceof Buffer ? message.payload.toString() : message.payload;
            console.log(`[MockMqttClient] Publishing to topic "${message.topic}": ${payloadString}`);
        });
    }
    subscribe(topic, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                console.warn('[MockMqttClient] Not connected, cannot subscribe.');
                return;
            }
            console.log(`[MockMqttClient] Subscribing to topic(s): "${JSON.stringify(topic)}"`);
        });
    }
    onMessage(callback) {
        this.on('message', callback);
    }
    // 模擬傳入的 MQTT 訊息用於測試
    simulateIncomingMessage(topic, payload, packet) {
        const bufferPayload = typeof payload === 'string' ? Buffer.from(payload) : payload;
        console.log(`[MockMqttClient] Simulating incoming message on topic "${topic}": ${bufferPayload.toString()}`);
        this.emit('message', topic, bufferPayload, packet);
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MockMqttClient] Disconnecting...');
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = false;
                console.log('[MockMqttClient] Disconnected.');
                resolve();
            }, 50));
        });
    }
}
exports.MockMqttClient = MockMqttClient;
