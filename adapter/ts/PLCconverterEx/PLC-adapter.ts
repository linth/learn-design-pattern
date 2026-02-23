import { MitsubishiPLC, SiemensPLC } from "./twoPLC";

/**
 * 轉接器模式 (Adapter) 結合 簡單工廠模式 (Simple Factory)。
 * 這樣做的優點是：你的 Kernel 不僅不需要知道 PLC 的通訊細節，甚至連「現在要建立哪一個 Adapter」都不用操心，只要把設定檔（或是環境變數）丟給工廠即可。
 */
export interface PLCAdapter {
  startStation(stationId: string): void;
}

/**
 * 實作轉接器 (Adapters)
 * 這是設計模式的核心。轉接器內部持有廠商類別的實體，並將 startStation 轉換成對應的動作。
 * 
 * 兩個轉接器 MitsubishiAdapter、SiemensAdapter
 */


// 三菱轉接器
export class MitsubishiAdapter implements PLCAdapter {
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
export class SiemensAdapter implements PLCAdapter {
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