// src/adapters/ModbusToMqttAdapter.ts

import { IMqttClient } from '../interfaces/mqtt.interface';
import { IModbusClient } from '../interfaces/modbus.interface';
import { IModbusToMqttJsonTransformer } from '../interfaces/transform.interface';
import { ModbusRegisters } from '../interfaces/modbus.interface';
import { ModbusToMqttTransformConfig } from '../transformations/ModbusToMqttJsonTransformer';

/**
 * ModbusToMqttAdapter: 定期從 Modbus 讀取數據並發布為 MQTT 訊息。
 *
 * @param modbusClient - 實際的 Modbus 客戶端實例。
 * @param mqttClient - 實際的 MQTT 客戶端實例。
 * @param transformer - 用於將 Modbus 數據轉換為 MQTT 訊息的策略。
 * @param config - 適配器的配置，包括要讀取的 Modbus 暫存器資訊和發布 MQTT 的主題。
 */
export interface ModbusToMqttAdapterConfig {
    slaveId: number;
    address: number;
    quantity: number;
    pollingIntervalMs: number; // 定期讀取的間隔
    transformConfig: ModbusToMqttTransformConfig;
}

export class ModbusToMqttAdapter {
  private readonly modbusClient: IModbusClient;
  private readonly mqttClient: IMqttClient;
  private readonly transformer: IModbusToMqttJsonTransformer;
  private readonly config: ModbusToMqttAdapterConfig;
  private pollingTimer: NodeJS.Timeout | null = null;

  constructor(
    modbusClient: IModbusClient,
    mqttClient: IMqttClient,
    transformer: IModbusToMqttJsonTransformer,
    config: ModbusToMqttAdapterConfig
  ) {
    this.modbusClient = modbusClient;
    this.mqttClient = mqttClient;
    this.transformer = transformer;
    this.config = config;
  }

  public async start(): Promise<void> {
    await this.modbusClient.connect();
    await this.mqttClient.connect();

    this.pollingTimer = setInterval(this.pollModbusAndPublish.bind(this), this.config.pollingIntervalMs);
    console.log(`[ModbusToMqttAdapter] Adapter started, polling Modbus every ${this.config.pollingIntervalMs}ms.`);
  }

  private async pollModbusAndPublish(): Promise<void> {
    console.log(`[ModbusToMqttAdapter] Polling Modbus: slaveId=${this.config.slaveId}, address=${this.config.address}, quantity=${this.config.quantity}`);
    try {
      const registers: ModbusRegisters = await this.modbusClient.readHoldingRegisters(
        this.config.slaveId,
        this.config.address,
        this.config.quantity
      );

      const mqttMessage = this.transformer.transform(
        { slaveId: this.config.slaveId, address: this.config.address, values: registers },
        this.config.transformConfig
      );
      await this.mqttClient.publish(mqttMessage);
      console.log(`[ModbusToMqttAdapter] Successfully published Modbus data to MQTT topic: ${mqttMessage.topic}`);
    } catch (error) {
      console.error(`[ModbusToMqttAdapter] Error polling Modbus or publishing to MQTT:`, error);
    }
  }

  public async stop(): Promise<void> {
    console.log('[ModbusToMqttAdapter] Stopping adapter...');
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
    await this.mqttClient.disconnect();
    await this.modbusClient.disconnect();
    console.log('[ModbusToMqttAdapter] Adapter stopped.');
  }
}