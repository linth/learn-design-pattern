// src/clients/MqttClient.ts

import { IMqttClient, IMqttMessage } from '../interfaces/mqtt.interface';
import { EventEmitter } from 'events'; // 用於模擬訊息事件

export class MockMqttClient extends EventEmitter implements IMqttClient {
  private isConnected: boolean = false;

  async connect(options?: any): Promise<void> {
    console.log(`[MockMqttClient] Connecting... (options: ${JSON.stringify(options || {})})`);
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = true;
      console.log('[MockMqttClient] Connected.');
      resolve();
    }, 100));
  }

  async publish(message: IMqttMessage): Promise<void> {
    if (!this.isConnected) {
      console.warn('[MockMqttClient] Not connected, cannot publish.');
      return;
    }
    const payloadString = message.payload instanceof Buffer ? message.payload.toString() : message.payload;
    console.log(`[MockMqttClient] Publishing to topic "${message.topic}": ${payloadString}`);
  }

  async subscribe(topic: string | string[], options?: any): Promise<void> {
    if (!this.isConnected) {
      console.warn('[MockMqttClient] Not connected, cannot subscribe.');
      return;
    }
    console.log(`[MockMqttClient] Subscribing to topic(s): "${JSON.stringify(topic)}"`);
  }

  onMessage(callback: (topic: string, payload: Buffer, packet: any) => void): void {
    this.on('message', callback);
  }

  // 模擬傳入的 MQTT 訊息用於測試
  public simulateIncomingMessage(topic: string, payload: string | Buffer, packet?: any): void {
    const bufferPayload = typeof payload === 'string' ? Buffer.from(payload) : payload;
    console.log(`[MockMqttClient] Simulating incoming message on topic "${topic}": ${bufferPayload.toString()}`);
    this.emit('message', topic, bufferPayload, packet);
  }

  async disconnect(): Promise<void> {
    console.log('[MockMqttClient] Disconnecting...');
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = false;
      console.log('[MockMqttClient] Disconnected.');
      resolve();
    }, 50));
  }
}