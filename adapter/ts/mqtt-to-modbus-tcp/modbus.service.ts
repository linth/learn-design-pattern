import { DeviceCommandDto } from "./device-command.dto";


export class ModbusService {
	async sendCommand(command: DeviceCommandDto): Promise<void> {
		console.log(`[MODBUS] Write to device ${command.deviceId}, register ${command.registerAddress}, value ${command.value}`);
    // 模擬 Modbus TCP 寫入邏輯
	}
}