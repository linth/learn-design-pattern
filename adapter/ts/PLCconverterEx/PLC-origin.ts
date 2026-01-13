
{
  interface PLCAdapter {
    startStation(stationId: string): void;
  }


  /**
   * 現有的不相容類別 (Adaptees)
   * 這些是廠商提供的 SDK 或通訊類別，它們的方法名稱和參數格式各不相同。
   */

  // 廠商 A: 三菱 PLC (使用 MC Protocol)
  class MitsubishiPLC {
    public sendCommand(command: string, address: number): void {
      console.log(`[MC Protocol] 傳送指令: ${command} 至位址: ${address}`);
    }
  }

  // 廠商 B: 西門子 PLC (使用 OPC-UA)
  class SiemensPLC {
    public writeNode(nodePath: string, value: boolean): void {
      console.log(`[OPC-UA] 寫入節點: ${nodePath}, 數值: ${value}`);
    }
  }


  /**
   * 實作轉接器 (Adapters)
   * 這是設計模式的核心。轉接器內部持有廠商類別的實體，並將 startStation 轉換成對應的動作。
   */
  // 三菱轉接器
  class MitsubishiAdapter implements PLCAdapter {
    private plc: MitsubishiPLC;

    constructor(plc: MitsubishiPLC) {
      this.plc = plc;
    }

    startStation(stationId: string): void {
      // 將 stationId 轉換成三菱特定的位址，例如 1 號站對應位址 1000
      const address = parseInt(stationId) + 1000;
      this.plc.sendCommand("START", address);
    }
  }

  // 西門子轉接器
  class SiemensAdapter implements PLCAdapter {
    private plc: SiemensPLC;

    constructor(plc: SiemensPLC) {
      this.plc = plc;
    }

    startStation(stationId: string): void {
      // 將 stationId 轉換成 OPC-UA 的 Node Path
      const path = `Stations.Device_${stationId}.Control.Start`;
      this.plc.writeNode(path, true);
    }
  }


  class Kernel {
    execute(adapter: PLCAdapter, id: string) {
      console.log("Kernel: 準備啟動工作站...");
      adapter.startStation(id);
    }
  }

  // --- 使用方式 ---
  const kernel = new Kernel();

  // 假設現場是三菱設備
  const Mplc = new MitsubishiPLC();
  const mitsubishi = new MitsubishiAdapter(Mplc);
  kernel.execute(mitsubishi, "5");

  // 假設現場換成西門子設備
  const Splc = new SiemensPLC();
  const siemens = new SiemensAdapter(Splc);
  kernel.execute(siemens, "5");


  /**
   * 執行使用 ts-node <file_name>
   */
}