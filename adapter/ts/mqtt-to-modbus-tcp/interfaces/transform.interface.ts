// src/interfaces/transform.interface.ts

import { IMqttMessage } from "./mqtt.interface";
import { ITALQMessage } from "./talq.interface";
import { ModbusRegisters } from "./modbus.interface";

// 通用資料轉換器介面
export interface IDataTransformer<Input, Output, Config = any> {
  transform(data: Input, config?: Config): Output;
}

// 針對特定轉換方向的介面，提供更好的類型安全
export interface IMqttToModbusValueTransformer extends IDataTransformer<IMqttMessage, { slaveId: number, address: number, values: ModbusRegisters }> {}
export interface IModbusToMqttJsonTransformer extends IDataTransformer<{ slaveId: number, address: number, values: ModbusRegisters }, IMqttMessage> {}
export interface IMqttToTalqMessageTransformer extends IDataTransformer<IMqttMessage, ITALQMessage> {}

export { IMqttMessage, ModbusRegisters, ITALQMessage };
