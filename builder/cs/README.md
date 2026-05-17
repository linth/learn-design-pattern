# Builder Pattern - C# 範例

本資料夾包含 Builder Pattern 的 C# 實作範例，使用現代 C# 特性（Fluent Interface、Records、Action Delegate）。

## 檔案結構

```
builder/cs/
├── builder.csproj      # 專案檔
├── Program.cs          # 入口程式
├── 1_ComputerBuilder.cs    # 電腦組裝 - 基本 Builder
├── 2_NotificationBuilder.cs # 通知訊息 - Fluent Interface
├── 3_QueryBuilder.cs       # SQL 查詢 - 複雜物件建構
├── 4_PizzaBuilder.cs       # 披薩建構器
├── 5_DocumentBuilder.cs   # 文件建構器
└── README.md              # 本檔案
```

## 執行方式

```bash
cd builder/cs
dotnet run
```

## 什麼是 Builder Pattern？

**建立者模式** (Builder Pattern) 是一種**創建型設計模式**，其核心思想是：

> 將一個複雜物件的建立過程拆分成多個步驟，讓客戶端可以逐步設定物件的各個部分，最後呼叫 Build() 方法取得完整的產品。

### 為什麼使用 Builder 模式？

1. **簡化複雜物件建立** - 將複雜的建構過程分解為多個步驟
2. **Fluent Interface** - 方法鏈式呼叫，語法清晰
3. **可讀性高** - 客戶端可以清楚看到建立過程
4. **可選參數** - 可以靈活設定需要的欄位
5. **不可變物件** - 可以建立不可變的物件

---

## 模式結構

```
┌─────────────────┐       ┌─────────────────┐
│     Director    │──────▶│     Builder     │
│   (指導者)     │       │   (建立者介面)  │
└─────────────────┘       └────────┬────────┘
                                   │
                                   ▼
                              ┌─────────────┐
                              │  Concrete   │
                              │   Builder   │
                              └──────┬──────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │   Product   │
                              │   (產品)    │
                              └─────────────┘
```

### 角色說明

| 角色 | 說明 | 範例 |
|------|------|------|
| **Product** | 要建立的複雜物件 | Computer, Pizza, Document |
| **Builder** | 定義建立步驟的介面 | IComputerBuilder |
| **Concrete Builder** | 實作具體的建立邏輯 | GamingComputerBuilder |
| **Director** | 封裝常用的建立流程 | ComputerDirector |

---

## 範例說明

### 1. ComputerBuilder - 電腦組裝
- 展示基本的 Builder 模式結構
- 遊戲電腦、辦公電腦、工作站
- 使用 Director 封裝建立流程

### 2. NotificationBuilder - 通知訊息
- Fluent Interface 範例
- 鏈式呼叫 (方法串接)
- 靜態工廠方法 Create()
- 適用於可選參數多的物件

### 3. QueryBuilder - SQL 查詢建構器
- 複雜物件建立
- WHERE, ORDER BY, GROUP BY 等
- 避免 SQL 注入

### 4. PizzaBuilder - 披薩建構器
- 義式、美式不同風格
- 尺寸、配料、樣式選項
- 價格計算

### 5. DocumentBuilder - 文件建構器
- 技術報告、行銷文件
- Action<Style> 進行細部設定
- 多種輸出格式

---

## C# 特性使用

| 特性 | 範例 |
|------|------|
| Fluent Interface | `builder.SetX().SetY().Build()` |
| Action Delegate | `SetStyle(s => { s.FontSize = 12; })` |
| params | `AddToppings(params string[] toppings)` |
| 靜態工廠方法 | `NotificationBuilder.Create()` |
| 鏈式呼叫 | 每個 Set 方法回傳 `this` |

---

## 應用場景

### 1. 物件建立
- **複雜物件** - 具有很多可選參數的物件
- **不可變物件** - 建立後不能修改的物件
- **具有預設值** - 可以使用預設值的物件

### 2. 資料處理
- **SQL 查詢** - 動態建立 SQL 語句
- **API 請求** - HTTP 請求的複雜參數
- **篩選條件** - 搜尋引擎的篩選器

### 3. 通知/訊息
- **推播通知** - 包含標題、內容、圖片、動作等
- **電子郵件** - HTML 郵件的複雜結構
- **訊息佇列** - 訊息的各種屬性

### 4. 文件/報告
- **PDF 報告** - 複雜的文件結構
- **Excel 試算表** - 多個工作表、公式
- **HTML 頁面** - 動態網頁內容

### 5. 遊戲/模擬
- **角色建立** - 遊戲角色的外觀、屬性
- **關卡設計** - 遊戲關卡的各種元素
- **設定檔** - 應用程式的複雜設定

---

## Fluent Interface 範例

```csharp
// 一般的建構方式
var computer = new Computer();
computer.CPU = "Intel i9";
computer.RAM = "64GB";
computer.GPU = "RTX 4090";

// 使用 Builder
var computer = new ComputerBuilder()
    .SetCPU("Intel i9")
    .SetRAM("64GB")
    .SetGPU("RTX 4090")
    .EnableWiFi(true)
    .AddPeripheral("鍵盤")
    .Build();
```

---

## 輸出範例

```
============================================================
Builder Pattern - C# 範例集
============================================================

1. 電腦組裝 - 基本 Builder 模式
============================================================

🎮 建立遊戲電腦 (使用 Director):
   🖥️ 電腦組態
   ─────────────────────────────────────────
   CPU: AMD Ryzen 9 7950X
   RAM: 64GB DDR5-6000
   儲存: 4TB NVMe Gen5 SSD
   ...

5. 文件建構器
============================================================

📄 範例 3 - 自訂技術報告:
   📄 文件: API 技術文件
   ─────────────────────────────────────────
   作者: 開發團隊
   建立日期: 2024-01-15
   ...
```

---

## 學習重點

1. **識別複雜物件** - 具有多個可選參數的物件
2. **拆解建立過程** - 將建構分為多個步驟
3. **Fluent Interface** - 使用鏈式呼叫
4. **Director (可選)** - 封裝常用流程
5. **驗證與預設值** - 在 Build() 中處理

---

## 延伸閱讀

- [Refactoring Guru - Builder](https://refactoring.guru/design-patterns/builder)
- [Microsoft Docs - Builder Design Pattern](https://docs.microsoft.com/en-us/aspnetcore/fundamentals/factories)
- [Fluent Interface Pattern](https://martinfowler.com/bliki/FluentInterface.html)