# PLCconverterEx (PLC 轉接器擴充範例)

本專案展示了如何結合 **轉接器模式 (Adapter Pattern)** 與 **簡單工廠模式 (Simple Factory Pattern)** 來解決工業自動化中不同廠商 PLC (可程式邏輯控制器) 通訊協定不一的問題。

## 專案背景

在自動化場景中，核心控制系統 (Kernel) 需要與多種品牌的 PLC 通訊。然而，每個廠商提供的 SDK 或通訊協定各不相同：
- **三菱 (Mitsubishi)**: 使用 MC Protocol，透過 `sendCommand` 傳送指令至位址。
- **西門子 (Siemens)**: 使用 OPC-UA，透過 `writeNode` 寫入節點路徑。

如果不使用設計模式，Kernel 程式碼將充斥著大量的 `if-else` 或 `switch` 來處理不同硬體的細節，導致維護困難。

## 使用的設計模式

### 1. 轉接器模式 (Adapter Pattern)
定義一個統一的介面 `PLCAdapter`，強制所有廠商的轉接器都必須實作 `startStation` 方法。轉接器負責將 Kernel 的通用需求轉換為特定廠商的通訊指令。

### 2. 簡單工廠模式 (Simple Factory Pattern)
使用 `PLCFactory` 來負責建立對應的轉接器實體。Kernel 只需要告訴工廠目前需要的 PLC 類型 (如 'SIEMENS' 或 'MITSUBISHI')，而不需要知道背後具體是如何初始化與裝配的。

## 檔案架構說明

- [twoPLC.ts](./twoPLC.ts): 定義原始的廠商類別 (Adaptees)，包含三菱與西門子的通訊邏輯。
- [PLC-adapter.ts](./PLC-adapter.ts): 定義統一介面 `PLCAdapter` 以及具體的轉接器實作。
- [PLC-factory.ts](./PLC-factory.ts): 負責根據類型建立轉接器的工廠類別。
- [main.ts](./main.ts): 系統入口，模擬 Kernel 載入設定並執行 PLC 操作。
- [PLC-origin.ts](./PLC-origin.ts): 簡易版的實作參考 (包含介面、轉接器與執行的單檔展示)。
- [PLC-test.ts](./PLC-test.ts): 使用 Jest 撰寫的單元測試範例，展示如何測試轉接器。

## 操作說明

### 執行專案
確保已安裝 `ts-node`，在資料夾下執行：
```bash
ts-node main.ts
```

### 執行測試
本專案包含測試程式碼，可參考以下指令安裝依賴並執行：
```bash
# 安裝測試依賴
npm install --save-dev jest ts-jest @types/jest

# 初始化設定 (若尚未初始化)
npx ts-jest config:init

# 執行測試
npx jest PLC-test.ts
```

## 核心優勢
1. **解耦 (Decoupling)**: Kernel 完全不依賴特定的 PLC 實作類別。
2. **擴充性 (Extensibility)**: 未來若增加新品牌 (如 Keyence)，只需新增一個轉接器並修改工廠配置，Kernel 程式碼無需更動。
3. **可測試性 (Testability)**: 可以輕易透過 MockAdapter 進行單元測試。
