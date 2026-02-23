// src/transformations/MqttToTalqMessageTransformer.ts

import { IMqttToTalqMessageTransformer, IMqttMessage, ITALQMessage } from '../interfaces/transform.interface';
import { TalqMessageBuilder } from './TalqMessageBuilder'; // 使用 Builder 模式構建複雜 TALQ 訊息

/**
 * 配置範例：
 * {
 * "messageType": "Command", // 來自 MQTT 訊息的 TALQ 訊息類型
 * "senderId": "myMqttGateway",
 * "receiverIdKey": "deviceId", // 從 MQTT payload 中提取 receiverId 的鍵
 * "commandKey": "action",      // 從 MQTT payload 中提取命令名稱的鍵
 * "dataKey": "params"          // 從 MQTT payload 中提取命令參數的鍵
 * }
 */
export interface MqttToTalqTransformConfig {
  messageType: string;
  senderId: string;
  receiverIdKey?: string; // 如果 TALQ 訊息需要 receiverId
  commandKey?: string;    // 如果 MQTT 訊息是命令，提取命令名稱
  dataKey?: string;       // 如果 MQTT 訊息有參數，提取參數
  // ... 其他 TALQ 訊息特定字段的映射規則
}

export class MqttToTalqMessageTransformer implements IMqttToTalqMessageTransformer {
  transform(message: IMqttMessage, config: MqttToTalqTransformConfig): ITALQMessage {
    try {
      const payload = JSON.parse(message.payload.toString());

      const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`; // 生成唯一 ID
      const timestamp = new Date().toISOString();
      const senderId = config.senderId;
      const receiverId = config.receiverIdKey ? payload[config.receiverIdKey] : undefined;

      let talqPayload: any = {};
      if (config.commandKey) {
        talqPayload['commandName'] = payload[config.commandKey];
      }
      if (config.dataKey) {
        talqPayload['commandData'] = payload[config.dataKey];
      }
      // 可以根據需要映射更多 MQTT payload 到 TALQ payload
      // 例如： talqPayload['status'] = payload['status'];

      // 使用 TalqMessageBuilder 來構建訊息，提高可讀性
      const talqMessage = new TalqMessageBuilder()
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

    } catch (error) {
      console.error(`[MqttToTalqMessageTransformer] Error transforming MQTT message for topic "${message.topic}":`, error);
      throw error;
    }
  }
}