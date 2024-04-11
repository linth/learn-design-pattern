/**
 * snmp polling with CoR design pattern.
 * 
 */

{
  interface Device {
    poll(): void;
  }

  class SNMPDevice implements Device {
    poll(): void {
      console.log('Polling SNMP device...');
      // 實現 SNMP 設備的輪詢邏輯
    }
  }

  class IoTDevice implements Device {
    poll(): void {
      console.log("Polling IoT device...");
      // 實現 IoT 設備的輪詢邏輯
    }
  }

  interface PollingHandler {
    hander(device: Device): void;
    setNextHandler(handler: PollingHandler): void;
  }

  class SNMPHandler implements PollingHandler {
    private nextHandler: PollingHandler | null = null;

    hander(device: Device): void {
      if (device instanceof SNMPDevice) {
        device.poll();
      } else if (this.nextHandler !== null) {
        this.nextHandler.hander(device);
      } else {
        console.log('No suitable handler found for the device.');
      }
    }

    setNextHandler(handler: PollingHandler): void {
      this.nextHandler = handler;
    }
  }

  class IoTHandler implements PollingHandler {
    private nextHandler: PollingHandler | null = null;

    hander(device: Device): void {
      if (device instanceof IoTDevice) {
        device.poll();
      } else if (this.nextHandler !== null) {
        this.nextHandler.hander(device);
      } else {
        console.log('No suitable handler found for the device.');
      }
    }

    setNextHandler(handler: PollingHandler) {
      this.nextHandler = handler;
    }
  }

  const snmpDevice = new SNMPDevice();
  const iotDevice = new IoTDevice();

  const snmpHandler = new SNMPHandler();
  const iotHandler = new IoTHandler();

  snmpHandler.setNextHandler(iotHandler);

  snmpHandler.hander(snmpDevice); // 輸出：Polling SNMP device...
  snmpHandler.hander(iotDevice); // 輸出：Polling IoT device..
}