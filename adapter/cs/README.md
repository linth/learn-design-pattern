# Adapter Pattern - C# 範例

本資料夾包含 Adapter Pattern 的 C# 實作範例，使用現代 C# 特性（Records、Pattern Matching、Nullable Reference Types）。

## 檔案結構

```
adapter/cs/
├── adapter.csproj      # 專案檔
├── Program.cs          # 入口程式
├── 1_BasicConcept.cs   # 基本概念示範
├── 2_CurrencyConverter.cs  # 幣別轉換範例
├── 3_PaymentGateway.cs    # 支付閘道整合
├── 4_LegacySystem.cs      # 舊系統資料遷移
├── 5_SensorAdapter.cs     # 感測器統一介面
└── README.md              # 本檔案
```

## 執行方式

```bash
# 編譯並執行
cd adapter/cs
dotnet run

# 或指定專案執行
dotnet run --project adapter.csproj
```

## 範例說明

### 1. BasicConcept - 基本概念
- 展示轉接器模式的基本結構
- 目標介面 (ITarget)、被轉接者 (Adaptee)、轉接器 (Adapter)
- 使用組合模式實作

### 2. CurrencyConverter - 幣別轉換
- 將 TWD 計算系統轉換成支援多幣別
- 使用 C# Records 定義資料結構
- 展示 Dependency Injection 風格

### 3. PaymentGateway - 支付閘道
- 整合 LinePay、街口支付、信用卡三種支付方式
- 使用工廠模式建立轉接器
- 展示完整的轉接邏輯

### 4. LegacySystem - 舊系統遷移
- 舊系統 XML 資料轉換為新系統 JSON 格式
- 使用介面隔離
- 展示資料格式轉換的典型應用

### 5. SensorAdapter - 感測器統一介面
- 整合 Siemens、Mitsubishi、Omron 三種 PLC
- 展示 IoT/工業自動化的應用場景
- 統一不同硬體的讀取介面

## C# 特性使用

| 特性 | 範例 |
|------|------|
| Records | `CurrencyResult`, `OrderDto` |
| Pattern Matching | `productType switch` |
| Nullable Reference Types | 啟用 `<Nullable>enable</Nullable>` |
| 介面 | `ITarget`, `IPaymentGateway` |
| 命名空間 | `AdapterExamples` |

## 輸出範例

```
============================================================
Adapter Pattern - C# 範例集
============================================================

1. 基本概念示範
============================================================
客戶端呼叫: Adapter: (翻譯) 緒了就列車邀特
...

5. 感測器統一介面範例
============================================================
📊 工廠感測器統一讀取結果 (9 筆資料)
------------------------------------------------------------
品牌          感測器ID                      數值        單位
------------------------------------------------------------
Siemens       siemens_temp_temp_1          10.00      °C
Siemens       siemens_temp_temp_2          10.00      °C
Mitsubishi    mitsubishi_temp_temp_1       24.00      °C
Mitsubishi    mitsubishi_temp_temp_2       26.00      °C
Omron         omron_temp_temp_1            10.00      °C
Omron         omron_temp_temp_2            11.50      °C
```

## 學習重點

1. **識別介面不相容** - 找到兩個系統間的介面差異
2. **定義目標介面** - 客戶端期望的統一介面
3. **實作轉接器** - 負責介面轉換的類別
4. **使用組合** - 轉接器持有被轉接者的實例

## 延伸閱讀

- [Microsoft Docs - Adapter Pattern](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/filters)
- [Refactoring Guru - Adapter](https://refactoring.guru/design-patterns/adapter/csharp-example)