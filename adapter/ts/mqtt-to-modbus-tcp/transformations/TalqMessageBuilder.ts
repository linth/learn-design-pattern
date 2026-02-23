// src/transformations/TalqMessageBuilder.ts

import { ITALQMessage } from '../interfaces/talq.interface';

/**
 * TALQ 訊息建造者 (Builder Pattern)
 * 用於複雜 TALQ 訊息的逐步構建，提高可讀性和靈活性。
 */
export class TalqMessageBuilder {
  private message: Partial<ITALQMessage> = {};

  public withMessageId(id: string): TalqMessageBuilder {
    this.message.messageId = id;
    return this;
  }

  public withSenderId(id: string): TalqMessageBuilder {
    this.message.senderId = id;
    return this;
  }

  public withReceiverId(id: string): TalqMessageBuilder {
    this.message.receiverId = id;
    return this;
  }

  public withTimestamp(timestamp: string): TalqMessageBuilder {
    this.message.timestamp = timestamp;
    return this;
  }

  public withMessageType(type: string): TalqMessageBuilder {
    this.message.messageType = type;
    return this;
  }

  public withPayload(payload: any): TalqMessageBuilder {
    this.message.payload = payload;
    return this;
  }

  // 可以添加更多方法來設置 TALQ 訊息的特定字段
  // public withCorrelationId(id: string): TalqMessageBuilder { ... }

  public build(): ITALQMessage {
    // 確保所有必要字段都已設置
    if (!this.message.messageId || !this.message.senderId || !this.message.timestamp || !this.message.messageType) {
      throw new Error("Missing required TALQ message fields.");
    }
    return this.message as ITALQMessage;
  }
}