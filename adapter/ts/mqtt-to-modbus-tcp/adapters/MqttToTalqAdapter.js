"use strict";
// src/adapters/MqttToTalqAdapter.ts
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
exports.MqttToTalqAdapter = void 0;
class MqttToTalqAdapter {
    constructor(mqttClient, talqClient, transformer, config) {
        this.mqttClient = mqttClient;
        this.talqClient = talqClient;
        this.transformer = transformer;
        this.config = config;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mqttClient.connect();
            yield this.talqClient.connect();
            yield this.mqttClient.subscribe(this.config.subscribeTopic);
            console.log(`[MqttToTalqAdapter] Subscribed to MQTT topic: ${this.config.subscribeTopic}`);
            this.mqttClient.onMessage(this.handleMqttMessage.bind(this));
            console.log('[MqttToTalqAdapter] Adapter started, listening for MQTT messages.');
        });
    }
    handleMqttMessage(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[MqttToTalqAdapter] Received MQTT message on topic "${topic}".`);
            try {
                const talqMessage = this.transformer.transform({ topic, payload }, this.config.transformConfig);
                yield this.talqClient.sendMessage(talqMessage);
                console.log(`[MqttToTalqAdapter] Successfully sent TALQ message (ID: ${talqMessage.messageId}).`);
            }
            catch (error) {
                console.error(`[MqttToTalqAdapter] Error processing MQTT message for topic "${topic}":`, error);
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MqttToTalqAdapter] Stopping adapter...');
            // 在實際應用中，可能需要取消訂閱
            yield this.mqttClient.disconnect();
            yield this.talqClient.disconnect();
            console.log('[MqttToTalqAdapter] Adapter stopped.');
        });
    }
}
exports.MqttToTalqAdapter = MqttToTalqAdapter;
