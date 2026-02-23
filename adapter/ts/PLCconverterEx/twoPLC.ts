/**
 * 現有的不相容類別 (Adaptees)
 * 這些是廠商提供的 SDK 或通訊類別，它們的方法名稱和參數格式各不相同。
 * 
 * 兩個 PLC 類別，一個是三菱，一個是西門子
 */

// 廠商 A: 三菱 PLC (使用 MC Protocol)
export class MitsubishiPLC {
  public sendCommand(command: string, address: number): void {
    console.log(`[MC Protocol] 傳送指令: ${command} 至位址: ${address}`);
  }
}

// 廠商 B: 西門子 PLC (使用 OPC-UA)
export class SiemensPLC {
  public writeNode(nodePath: string, value: boolean): void {
    console.log(`[OPC-UA] 寫入節點: ${nodePath}, 數值: ${value}`);
  }
}