import { ModbusService } from "./modbus.service";
import { MqttHandlerService } from "./mqtt-handler.service";



async function main() {
	const modbusService = new ModbusService();
	const mqttHandler = new MqttHandlerService(modbusService);

	const exampleMqttPayload = {
		dev_id: 'plc001',
		reg_addr: '40001',
		data: '1234',
	};

	await mqttHandler.handleMqttMessage('device/write', exampleMqttPayload);
}

main();