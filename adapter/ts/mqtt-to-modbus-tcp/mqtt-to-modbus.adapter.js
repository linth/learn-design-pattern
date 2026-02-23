"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttToModbusAdapter = void 0;
class MqttToModbusAdapter {
    static convert(payload) {
        return {
            deviceId: payload.dev_id,
            registerAddress: parseInt(payload.reg_addr, 10),
            value: parseInt(payload.data, 10),
        };
    }
}
exports.MqttToModbusAdapter = MqttToModbusAdapter;
