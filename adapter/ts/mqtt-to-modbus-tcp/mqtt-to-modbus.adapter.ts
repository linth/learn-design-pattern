import { DeviceCommandDto } from "./device-command.dto";



export class MqttToModbusAdapter {
	static convert(payload: any): DeviceCommandDto {
		return {
			deviceId: payload.dev_id,
			registerAddress: parseInt(payload.reg_addr, 10),
      value: parseInt(payload.data, 10),
		}
	}
}