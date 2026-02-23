// src/clients/TalqClient.ts

import { ITALQClient, ITALQMessage } from '../interfaces/talq.interface';

export class MockTalqClient implements ITALQClient {
  private isConnected: boolean = false;

  async connect(options?: any): Promise<void> {
    console.log(`[MockTalqClient] Connecting... (options: ${JSON.stringify(options || {})})`);
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = true;
      console.log('[MockTalqClient] Connected.');
      resolve();
    }, 90));
  }

  async sendMessage(message: ITALQMessage): Promise<void> {
    if (!this.isConnected) {
      console.warn('[MockTalqClient] Not connected, cannot send message.');
      return;
    }
    console.log(`[MockTalqClient] Sending TALQ Message (ID: ${message.messageId}, Type: ${message.messageType}): ${JSON.stringify(message.payload)}`);
  }

  async disconnect(): Promise<void> {
    console.log('[MockTalqClient] Disconnecting...');
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = false;
      console.log('[MockTalqClient] Disconnected.');
      resolve();
    }, 40));
  }
}