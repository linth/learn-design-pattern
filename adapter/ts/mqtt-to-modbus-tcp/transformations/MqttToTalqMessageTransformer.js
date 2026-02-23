"use strict";
// src/transformations/MqttToTalqMessageTransformer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttToTalqMessageTransformer = void 0;
const TalqMessageBuilder_1 = require("./TalqMessageBuilder"); // 使用 Builder 模式構建複雜 TALQ 訊息
class MqttToTalqMessageTransformer {
    transform(message, config) {
        try {
            const payload = JSON.parse(message.payload.toString());
            const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // 生成唯一 ID
            const timestamp = new Date().toISOString();
            const senderId = config.senderId;
            const receiverId = config.receiverIdKey ? payload[config.receiverIdKey] : undefined;
            let talqPayload = {};
            if (config.commandKey) {
                talqPayload['commandName'] = payload[config.commandKey];
            }
            if (config.dataKey) {
                talqPayload['commandData'] = payload[config.dataKey];
            }
            // 可以根據需要映射更多 MQTT payload 到 TALQ payload
            // 例如： talqPayload['status'] = payload['status'];
            // 使用 TalqMessageBuilder 來構建訊息，提高可讀性
            const talqMessage = new TalqMessageBuilder_1.TalqMessageBuilder()
                .withMessageId(messageId)
                .withSenderId(senderId)
                .withMessageType(config.messageType)
                .withTimestamp(timestamp)
                .withPayload(talqPayload);
            if (receiverId) {
                talqMessage.withReceiverId(receiverId);
            }
            const finalMessage = talqMessage.build();
            console.log(`[MqttToTalqMessageTransformer] Transformed MQTT payload for topic "${message.topic}" to TALQ message (Type: ${config.messageType}): ${JSON.stringify(finalMessage.payload)}`);
            return finalMessage;
        }
        catch (error) {
            console.error(`[MqttToTalqMessageTransformer] Error transforming MQTT message for topic "${message.topic}":`, error);
            throw error;
        }
    }
}
exports.MqttToTalqMessageTransformer = MqttToTalqMessageTransformer;
