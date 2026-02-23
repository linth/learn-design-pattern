"use strict";
// src/clients/TalqClient.ts
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
exports.MockTalqClient = void 0;
class MockTalqClient {
    constructor() {
        this.isConnected = false;
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[MockTalqClient] Connecting... (options: ${JSON.stringify(options || {})})`);
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = true;
                console.log('[MockTalqClient] Connected.');
                resolve();
            }, 90));
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                console.warn('[MockTalqClient] Not connected, cannot send message.');
                return;
            }
            console.log(`[MockTalqClient] Sending TALQ Message (ID: ${message.messageId}, Type: ${message.messageType}): ${JSON.stringify(message.payload)}`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MockTalqClient] Disconnecting...');
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = false;
                console.log('[MockTalqClient] Disconnected.');
                resolve();
            }, 40));
        });
    }
}
exports.MockTalqClient = MockTalqClient;
