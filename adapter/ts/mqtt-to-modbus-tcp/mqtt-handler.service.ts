import { ModbusService } from "./modbus.service";
import { MqttToModbusAdapter } from "./mqtt-to-modbus.adapter";


export class MqttHandlerService {
	constructor(private modbusService: ModbusService) {}

	async handleMqttMessage(topic: string, payload: any): Promise<void> {
		const command = MqttToModbusAdapter.convert(payload);
		await this.modbusService.sendCommand(command);
	}
}