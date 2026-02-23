// 使用 OS 上的 kernel 來執行轉接器，創立 kernel 後，開始執行 adapter

import { PLCAdapter } from "./PLC-adapter";
import { PLCFactory, PLCType } from "./PLC-factory";

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