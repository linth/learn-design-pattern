/**
 *
 *
 *
 * 測試流程示意圖
 *  - 如何執行這些測試？
 *    => 安裝 Jest：npm install --save-dev jest ts-jest @types/jest
 *  - 初始化設定：npx ts-jest config:init
 *  - 執行指令：npx jest
 */

// // 假設我們使用 Jest 框架
// describe('PLC Adapters 測試', () => {

//   test('MitsubishiAdapter 應該正確轉換站號並呼叫 MC Protocol', () => {
//     // 1. 模擬原始的 MitsubishiPLC 類別
//     const mockMitsubishiPLC = {
//       sendCommand: jest.fn() // 追蹤此函數是否被呼叫
//     } as unknown as MitsubishiPLC;

//     const adapter = new MitsubishiAdapter(mockMitsubishiPLC);

//     // 2. 執行轉接器動作
//     adapter.startStation("5");

//     // 3. 驗證：是否將 "5" 轉換成位址 1005 (1000 + 5) 並發送 START
//     expect(mockMitsubishiPLC.sendCommand).toHaveBeenCalledWith("START", 1005);
//   });

//   test('SiemensAdapter 應該正確轉換站號為 Node Path', () => {
//     const mockSiemensPLC = {
//       writeNode: jest.fn()
//     } as unknown as SiemensPLC;

//     const adapter = new SiemensAdapter(mockSiemensPLC);

//     adapter.startStation("101");

//     // 驗證路徑格式是否正確
//     expect(mockSiemensPLC.writeNode).toHaveBeenCalledWith(
//       "Stations.Device_101.Control.Start",
//       true
//     );
//   });
// });



// describe('PLC 系統整合測試', () => {

//   test('Kernel 應該能根據設定檔動態切換並執行', () => {
//     // 模擬 console.log 來看輸出結果
//     const logSpy = jest.spyOn(console, 'log');

//     // 情境 A: 使用三菱
//     const kernelM = new Kernel('MITSUBISHI');
//     kernelM.run("1");
//     expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[MC Protocol]"));

//     // 情境 B: 使用西門子
//     const kernelS = new Kernel('SIEMENS');
//     kernelS.run("2");
//     expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[OPC-UA]"));

//     logSpy.mockRestore();
//   });

//   test('當傳入不支援的類型時應拋出錯誤', () => {
//     expect(() => {
//       PLCFactory.createAdapter('OMRON' as any);
//     }).toThrow('不支援的 PLC 類型: OMRON');
//   });
// });