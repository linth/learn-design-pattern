"use strict";
// src/transformations/TalqMessageBuilder.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalqMessageBuilder = void 0;
/**
 * TALQ 訊息建造者 (Builder Pattern)
 * 用於複雜 TALQ 訊息的逐步構建，提高可讀性和靈活性。
 */
class TalqMessageBuilder {
    constructor() {
        this.message = {};
    }
    withMessageId(id) {
        this.message.messageId = id;
        return this;
    }
    withSenderId(id) {
        this.message.senderId = id;
        return this;
    }
    withReceiverId(id) {
        this.message.receiverId = id;
        return this;
    }
    withTimestamp(timestamp) {
        this.message.timestamp = timestamp;
        return this;
    }
    withMessageType(type) {
        this.message.messageType = type;
        return this;
    }
    withPayload(payload) {
        this.message.payload = payload;
        return this;
    }
    // 可以添加更多方法來設置 TALQ 訊息的特定字段
    // public withCorrelationId(id: string): TalqMessageBuilder { ... }
    build() {
        // 確保所有必要字段都已設置
        if (!this.message.messageId || !this.message.senderId || !this.message.timestamp || !this.message.messageType) {
            throw new Error("Missing required TALQ message fields.");
        }
        return this.message;
    }
}
exports.TalqMessageBuilder = TalqMessageBuilder;
