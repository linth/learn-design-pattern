import { MitsubishiAdapter, PLCAdapter, SiemensAdapter } from "./PLC-adapter";
import { MitsubishiPLC, SiemensPLC } from "./twoPLC";

// 定義兩個類型：三菱和西門子
export type PLCType = 'MITSUBISHI' | 'SIEMENS';

export class PLCFactory {
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