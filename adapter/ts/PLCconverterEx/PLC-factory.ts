/**
 * 轉接器模式 (Adapter) 結合 簡單工廠模式 (Simple Factory)。
 * 這樣做的優點是：你的 Kernel 不僅不需要知道 PLC 的通訊細節，甚至連「現在要建立哪一個 Adapter」都不用操心，只要把設定檔（或是環境變數）丟給工廠即可。
 */

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


  // 定義兩個類型：三菱和西門子
  type PLCType = 'MITSUBISHI' | 'SIEMENS';

  class PLCFactory {
    static createAdapter(type: PLCType): PLCAdapter {
      /**
       * 根據類型生產對應的轉接器
       */
      switch (type) {
        case 'MITSUBISHI':
          // 這裡會處理內部的依賴關係
          return new MitsubishiAdapter(new MitsubishiPLC());
        case 'SIEMENS':
          return new SiemensAdapter(new SiemensPLC());
        default:
          throw new Error(`不支援的 PLC 類型: ${type}`);
      }
    }
  }

  // 使用 OS 上的 kernel 來執行轉接器，創立 kernel 後，開始執行 adapter
  // PLCAdapter -> SiemensAdapter, MitsubishiAdapter -> SiemensPLC, MitsubishiPLC
  class Kernel {
    private adaptor: PLCAdapter;

    constructor(plcType: PLCType) {
      // Kernel 在初始化時，透過工廠取得轉接器
      this.adaptor = PLCFactory.createAdapter(plcType);
    }

    public run(id: string) {
      console.log(`[Kernel] 啟動程序開始...`);
      this.adaptor.startStation(id);
    }
  }

  // --- 實際執行 ---
  // 假設從環境變數或資料庫讀取目前的硬體設定
  const currentConfig: PLCType = 'SIEMENS';

  const myKernel = new Kernel(currentConfig);
  myKernel.run("101");


  /**
   * 執行使用 ts-node <file_name>
   */

  /**
   * 這樣修改的好處
   * 1. 集中管理：所有關於「哪種 PLC 對應哪個 Class」的邏輯全部集中在 PLCFactory。如果未來要換成 Keyence，你只需要改工廠的一個 case。
   * 2. 降低耦合度：Kernel 類別現在完全不出現 MitsubishiPLC 或 SiemensPLC 這些字眼，這達到了真正的依賴反轉 (Dependency Inversion)。
   * 3. 易於測試：在單元測試時，你可以輕易地傳入一個 MockAdapter 給 Kernel，而不需要真的去連線 PLC。
   */
}