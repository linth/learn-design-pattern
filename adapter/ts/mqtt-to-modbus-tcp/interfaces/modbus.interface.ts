// src/interfaces/modbus.interface.ts

// 簡化的 Modbus 暫存器類型
export type ModbusRegister = number; // 代表一個 16 位無符號整數
export type ModbusRegisters = ModbusRegister[];

export interface IModbusClient {
  connect(): Promise<void>;
  readHoldingRegisters(slaveId: number, address: number, quantity: number): Promise<ModbusRegisters>;
  writeSingleRegister(slaveId: number, address: number, value: ModbusRegister): Promise<void>;
  writeMultipleRegisters(slaveId: number, address: number, values: ModbusRegisters): Promise<void>;
  disconnect(): Promise<void>;
}