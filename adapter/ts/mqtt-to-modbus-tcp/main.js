"use strict";
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
const modbus_service_1 = require("./modbus.service");
const mqtt_handler_service_1 = require("./mqtt-handler.service");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const modbusService = new modbus_service_1.ModbusService();
        const mqttHandler = new mqtt_handler_service_1.MqttHandlerService(modbusService);
        const exampleMqttPayload = {
            dev_id: 'plc001',
            reg_addr: '40001',
            data: '1234',
        };
        yield mqttHandler.handleMqttMessage('device/write', exampleMqttPayload);
    });
}
main();
