# serveral data converter
- MQTT -> Modbus tcp
- MQTT -> TALQ
- MQTT -> Modbus tcp -> TALQ


# MQTT -> Modbus tcp

# 範例 MQTT payload:
```json
{
  "dev_id": "plc001",
  "reg_addr": "40001",
  "data": "1234"
}
```



# 專案架構
```
src/
├── interfaces/
│   ├── mqtt.interface.ts
│   ├── modbus.interface.ts
│   ├── talq.interface.ts
│   ├── transform.interface.ts  // 用於資料轉換策略的介面
├── clients/
│   ├── MqttClient.ts           // 模擬的 MQTT 客戶端
│   ├── ModbusClient.ts         // 模擬的 Modbus 客戶端
│   ├── TalqClient.ts           // 模擬的 TALQ 客戶端
├── transformations/
│   ├── MqttToModbusValueTransformer.ts // MQTT payload JSON -> Modbus值
│   ├── ModbusToMqttJsonTransformer.ts   // Modbus值 -> MQTT JSON payload
│   ├── MqttToTalqMessageTransformer.ts // MQTT payload JSON -> TALQ 訊息
│   ├── TalqMessageBuilder.ts           // 可選：用於構建複雜 TALQ 訊息
├── adapters/
│   ├── MqttToModbusAdapter.ts
│   ├── ModbusToMqttAdapter.ts
│   ├── MqttToTalqAdapter.ts
├── models/
│   ├── common.types.ts         // 通用數據類型，例如 Modbus 暫存器值
├── configs/
│   ├── adapter.config.ts       // 適配器配置
├── main.ts                     // 入口點
```