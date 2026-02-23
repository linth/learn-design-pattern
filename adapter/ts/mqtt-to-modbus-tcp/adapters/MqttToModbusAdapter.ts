// src/adapters/MqttToModbusAdapter.ts

import { IMqttClient } from '../interfaces/mqtt.interface';
import { IModbusClient } from '../interfaces/modbus.interface';
import { IMqttToModbusValueTransformer } from '../interfaces/transform.interface';
import { MqttToModbusTransformConfig } from '../transformations/MqttToModbusValueTransformer';

/**
 * MqttToModbusAdapter: 將 MQTT 訊息轉換為 Modbus 寫操作。
 *
 * @param mqttClient - 實際的 MQTT 客戶端實例。
 * @param modbusClient - 實際的 Modbus 客戶端實例。
 * @param transformer - 用於將 MQTT payload 轉換為 Modbus 值的策略。
 * @param config - 適配器的配置，包括要訂閱的 MQTT 主題以及轉換規則。
 */
export interface MqttToModbusAdapterConfig {
  subscribeTopic: string;
  transformConfig: MqttToModbusTransformConfig;
}

export class MqttToModbusAdapter {
  private readonly mqttClient: IMqttClient;
  private readonly modbusClient: IModbusClient;
  private readonly transformer: IMqttToModbusValueTransformer;
  private readonly config: MqttToModbusAdapterConfig;

  constructor(
    mqttClient: IMqttClient,
    modbusClient: IModbusClient,
    transformer: IMqttToModbusValueTransformer,
    config: MqttToModbusAdapterConfig
  ) {
    this.mqttClient = mqttClient;
    this.modbusClient = modbusClient;
    this.transformer = transformer;
    this.config = config;
  }

  public async start(): Promise<void> {
    await this.mqttClient.connect();
    await this.modbusClient.connect();

    await this.mqttClient.subscribe(this.config.subscribeTopic);
    console.log(`[MqttToModbusAdapter] Subscribed to MQTT topic: ${this.config.subscribeTopic}`);

    this.mqttClient.onMessage(this.handleMqttMessage.bind(this));
    console.log('[MqttToModbusAdapter] Adapter started, listening for MQTT messages.');
  }

  private async handleMqttMessage(topic: string, payload: Buffer): Promise<void> {
    console.log(`[MqttToModbusAdapter] Received MQTT message on topic "${topic}".`);
    try {
      const modbusWriteData = this.transformer.transform({ topic, payload }, this.config.transformConfig);
      
      // 根據轉換結果執行 Modbus 寫操作
      if (modbusWriteData.values.length === 1) {
        await this.modbusClient.writeSingleRegister(
          modbusWriteData.slaveId,
          modbusWriteData.address,
          modbusWriteData.values[0]
        );
        console.log(`[MqttToModbusAdapter] Successfully wrote single Modbus register.`);
      } else if (modbusWriteData.values.length > 1) {
        await this.modbusClient.writeMultipleRegisters(
          modbusWriteData.slaveId,
          modbusWriteData.address,
          modbusWriteData.values
        );
        console.log(`[MqttToModbusAdapter] Successfully wrote multiple Modbus registers.`);
      } else {
        console.warn(`[MqttToModbusAdapter] No values to write to Modbus for topic "${topic}".`);
      }
    } catch (error) {
      console.error(`[MqttToModbusAdapter] Error processing MQTT message for topic "${topic}":`, error);
    }
  }

  public async stop(): Promise<void> {
    console.log('[MqttToModbusAdapter] Stopping adapter...');
    // 在實際應用中，可能需要取消訂閱
    await this.mqttClient.disconnect();
    await this.modbusClient.disconnect();
    console.log('[MqttToModbusAdapter] Adapter stopped.');
  }
}