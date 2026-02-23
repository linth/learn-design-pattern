// src/adapters/MqttToTalqAdapter.ts

import { IMqttClient } from '../interfaces/mqtt.interface';
import { ITALQClient } from '../interfaces/talq.interface';
import { IMqttToTalqMessageTransformer } from '../interfaces/transform.interface';
import { MqttToTalqTransformConfig } from '../transformations/MqttToTalqMessageTransformer';

/**
 * MqttToTalqAdapter: 將 MQTT 訊息轉換為 TALQ 訊息並發送。
 *
 * @param mqttClient - 實際的 MQTT 客戶端實例。
 * @param talqClient - 實際的 TALQ 客戶端實例。
 * @param transformer - 用於將 MQTT 訊息轉換為 TALQ 訊息的策略。
 * @param config - 適配器的配置，包括要訂閱的 MQTT 主題以及 TALQ 訊息轉換規則。
 */
export interface MqttToTalqAdapterConfig {
    subscribeTopic: string;
    transformConfig: MqttToTalqTransformConfig;
}

export class MqttToTalqAdapter {
    private readonly mqttClient: IMqttClient;
    private readonly talqClient: ITALQClient;
    private readonly transformer: IMqttToTalqMessageTransformer;
    private readonly config: MqttToTalqAdapterConfig;

    constructor(
        mqttClient: IMqttClient,
        talqClient: ITALQClient,
        transformer: IMqttToTalqMessageTransformer,
        config: MqttToTalqAdapterConfig
    ) {
        this.mqttClient = mqttClient;
        this.talqClient = talqClient;
        this.transformer = transformer;
        this.config = config;
    }

    public async start(): Promise<void> {
        await this.mqttClient.connect();
        await this.talqClient.connect();

        await this.mqttClient.subscribe(this.config.subscribeTopic);
        console.log(`[MqttToTalqAdapter] Subscribed to MQTT topic: ${this.config.subscribeTopic}`);

        this.mqttClient.onMessage(this.handleMqttMessage.bind(this));
        console.log('[MqttToTalqAdapter] Adapter started, listening for MQTT messages.');
    }

    private async handleMqttMessage(topic: string, payload: Buffer): Promise<void> {
        console.log(`[MqttToTalqAdapter] Received MQTT message on topic "${topic}".`);
        try {
            const talqMessage = this.transformer.transform({ topic, payload }, this.config.transformConfig);
            await this.talqClient.sendMessage(talqMessage);
            console.log(`[MqttToTalqAdapter] Successfully sent TALQ message (ID: ${talqMessage.messageId}).`);
        } catch (error) {
            console.error(`[MqttToTalqAdapter] Error processing MQTT message for topic "${topic}":`, error);
        }
    }

    public async stop(): Promise<void> {
        console.log('[MqttToTalqAdapter] Stopping adapter...');
        // 在實際應用中，可能需要取消訂閱
        await this.mqttClient.disconnect();
        await this.talqClient.disconnect();
        console.log('[MqttToTalqAdapter] Adapter stopped.');
    }
}