// src/clients/ModbusClient.ts

import { 
  IModbusClient, 
  ModbusRegisters, 
  ModbusRegister 
} from '../interfaces/modbus.interface';

export class MockModbusClient implements IModbusClient {
  private isConnected: boolean = false;
  private simulatedRegisters: Map<string, ModbusRegisters> = new Map(); // key: slaveId_address_quantity

  constructor() {
    // 初始化一些模擬數據
    this.simulatedRegisters.set('1_0_4', [100, 200, 300, 400]); // Slave 1, registers 0-3
    this.simulatedRegisters.set('2_0_3', [50, 60, 70]);      // Slave 2, registers 0-2
  }

  async connect(): Promise<void> {
    console.log('[MockModbusClient] Connecting...');
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = true;
      console.log('[MockModbusClient] Connected.');
      resolve();
      }, 80));
  }

  async readHoldingRegisters(slaveId: number, address: number, quantity: number): Promise<ModbusRegisters> {
    if (!this.isConnected) throw new Error('[MockModbusClient] Not connected.');
    console.log(`[MockModbusClient] Reading holding registers from slaveId ${slaveId}, address ${address}, quantity ${quantity}`);

    // 簡化模擬：直接返回預設數據
    const key = `${slaveId}_${address}_${quantity}`;
    const registers = this.simulatedRegisters.get(key);
    if (registers) {
      console.log(`[MockModbusClient] Read result for ${key}: ${JSON.stringify(registers)}`);
      return registers;
    }

    console.warn(`[MockModbusClient] No simulated registers for ${key}. Returning empty array.`);
    return [];
  }

  async writeSingleRegister(slaveId: number, address: number, value: ModbusRegister): Promise<void> {
    if (!this.isConnected) throw new Error('[MockModbusClient] Not connected.');
    console.log(`[MockModbusClient] Writing single register to slaveId ${slaveId}, address ${address}, value ${value}`);
    // 模擬寫入，可以在這裡更新內部狀態
    // For a real client, this would send a Modbus write request
  }

  async writeMultipleRegisters(slaveId: number, address: number, values: ModbusRegisters): Promise<void> {
    if (!this.isConnected) throw new Error('[MockModbusClient] Not connected.');
    console.log(`[MockModbusClient] Writing multiple registers to slaveId ${slaveId}, address ${address}, values ${JSON.stringify(values)}`);
    // 模擬寫入
    // For a real client, this would send a Modbus write request
  }

  async disconnect(): Promise<void> {
    console.log('[MockModbusClient] Disconnecting...');
    return new Promise(resolve => setTimeout(() => {
      this.isConnected = false;
      console.log('[MockModbusClient] Disconnected.');
      resolve();
    }, 50));
  }
}