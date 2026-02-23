"use strict";
// src/clients/ModbusClient.ts
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
exports.MockModbusClient = void 0;
class MockModbusClient {
    constructor() {
        this.isConnected = false;
        this.simulatedRegisters = new Map(); // key: slaveId_address_quantity
        // 初始化一些模擬數據
        this.simulatedRegisters.set('1_0_4', [100, 200, 300, 400]); // Slave 1, registers 0-3
        this.simulatedRegisters.set('2_0_3', [50, 60, 70]); // Slave 2, registers 0-2
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MockModbusClient] Connecting...');
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = true;
                console.log('[MockModbusClient] Connected.');
                resolve();
            }, 80));
        });
    }
    readHoldingRegisters(slaveId, address, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new Error('[MockModbusClient] Not connected.');
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
        });
    }
    writeSingleRegister(slaveId, address, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new Error('[MockModbusClient] Not connected.');
            console.log(`[MockModbusClient] Writing single register to slaveId ${slaveId}, address ${address}, value ${value}`);
            // 模擬寫入，可以在這裡更新內部狀態
            // For a real client, this would send a Modbus write request
        });
    }
    writeMultipleRegisters(slaveId, address, values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected)
                throw new Error('[MockModbusClient] Not connected.');
            console.log(`[MockModbusClient] Writing multiple registers to slaveId ${slaveId}, address ${address}, values ${JSON.stringify(values)}`);
            // 模擬寫入
            // For a real client, this would send a Modbus write request
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[MockModbusClient] Disconnecting...');
            return new Promise(resolve => setTimeout(() => {
                this.isConnected = false;
                console.log('[MockModbusClient] Disconnected.');
                resolve();
            }, 50));
        });
    }
}
exports.MockModbusClient = MockModbusClient;
