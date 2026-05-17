# Factory Pattern - C# 範例

本資料夾包含 Factory Pattern 的 C# 實作範例，使用現代 C# 特性（Records、Pattern Matching、Pattern Matching with Records）。

## 檔案結構

```
Factory/cs/
├── factory.csproj      # 專案檔
├── Program.cs          # 入口程式
├── 1_BasicFactory.cs   # 基本工廠模式
├── 2_PizzaStore.cs     # 經典範例 - 披薩店 (Factory Method)
├── 3_PaymentGateway.cs # 支付閘道工廠
├── 4_DocumentFactory.cs # 文件產生器工廠
├── 5_NotificationFactory.cs # 通知服務工廠
└── README.md              # 本檔案
```

## 執行方式

```bash
# 編譯並執行
cd Factory/cs
dotnet run
```

## 什麼是 Factory Pattern？

**工廠模式** (Factory Pattern) 是一種**創建型設計模式**，其核心思想是：

> 將物件的建立邏輯集中在一個「工廠」類別中，客戶端不需要知道具體的產品類別，只需要告訴工廠需要什麼產品即可。

### 為什麼使用工廠模式？

1. **解耦** - 客戶端與具體產品類別解耦
2. **易於擴展** - 新增產品不需要修改現有程式碼
3. **集中管理** - 物件建立邏輯集中在工廠中
4. **測試友好** - 可以輕鬆使用 Mock 物件替換

---

## 工廠模式的類型

### 1. 簡單工廠 (Simple Factory)
直接使用靜態方法或類別建立物件，適合產品種類較少的場景。

### 2. 工廠方法 (Factory Method)
定義一個建立物件的介面，但由子類別決定要實例化的類別。

### 3. 抽象工廠 (Abstract Factory)
建立一系列相關物件的介面，不需要指定具體類別。

---

## 範例說明

### 1. BasicFactory - 基本工廠模式
展示最基礎的工廠模式結構：
- 產品介面 (IProduct)
- 具體產品 (ConcreteProductA, B, C)
- 工廠類別 (ProductFactory)

### 2. PizzaStore - 工廠方法模式
經典的披薩店範例：
- 抽象建立者 (PizzaStore)
- 具體建立者 (NYPizzaStore, ChicagoPizzaStore)
- 產品 (Pizza 的各種口味)
- 每個地區的披薩店建立不同風味的披薩

### 3. PaymentGateway - 支付閘道工廠
電子商務常見應用：
- IPaymentGateway 介面
- LinePay, SkuPay, CreditCard, PayPal 具體實作
- PaymentGatewayFactory 工廠
- 支付服務使用工廠建立閘道

### 4. DocumentFactory - 文件產生器
文件轉換場景：
- IDocument 介面
- PDF, Word, HTML, Markdown, JSON 格式
- DocumentService 服務類別
- 常見於報告產生、匯出功能

### 5. NotificationFactory - 通知服務
多管道通知場景：
- INotificationChannel 介面
- Email, SMS, LINE, Push, Webhook 通道
- 根據優先級自動選擇通道
- 常用於驗證碼、系統通知、行銷訊息

---

## C# 特性使用

| 特性 | 範例 |
|------|------|
| Records | `PaymentRequest`, `NotificationResult` |
| Pattern Matching | `type.ToLower() switch` |
| Nullable Reference Types | `<Nullable>enable</Nullable>` |
| 介面 | `IProduct`, `IPaymentGateway` |
| 靜態工廠方法 | `ProductFactory.CreateProduct()` |
| Dictionary + Func | 動態建立產品 |

---

## 應用場景

### 1. 電子商務
- 支付閘道整合 (LinePay, 街口, 信用卡)
- 物流方式選擇 (黑貓, 新竹, 超商取貨)
- 優惠券類型 (折扣券, 現金券, 滿額券)

### 2. 系統開發
- 日誌記錄器 (Console, File, Database)
- 快取儲存 (Memory, Redis, Disk)
- 驗證器 (Email, Phone, ID)

### 3. 文件處理
- 報告匯出 (PDF, Excel, Word, HTML)
- 資料序列化 (JSON, XML, YAML)
- 圖片處理 (PNG, JPG, WebP)

### 4. 通知系統
- 多管道通知 (Email, SMS, LINE, Push)
- 訊息佇列 (RabbitMQ, Kafka, SQS)
- Webhook 觸發

### 5. IoT/硬體
- 感測器驅動程式
- PLC 通訊協定
- 設備連線管理

---

## 輸出範例

```
============================================================
Factory Pattern - C# 範例集
============================================================

1. 基本工廠模式
============================================================
📦 建立產品 A:
   名稱: 產品 A
   價格: 100
   描述: 這是產品 A 的描述
...

5. 通知服務工廠
============================================================
📧 使用 Email 通道:
   [Email] 發送郵件至: customer@example.com
   ✅ 發送成功: EMAIL-a1b2c3d4e5f6

🎯 重點說明：
   1. INotificationChannel 是產品介面
   2. 各通道 (Email, SMS, LINE) 是具體產品
   ...
```

---

## 學習重點

1. **識別不變的部分** - 產品的共同介面
2. **封裝變化的部分** - 具體產品的建立邏輯
3. **依賴抽象** - 客戶端依賴介面而非具體類別
4. **開放封閉原則** - 新增產品不需要修改現有程式碼

---

## 延伸閱讀

- [Refactoring Guru - Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [Refactoring Guru - Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
- [Microsoft Docs - Factory Pattern](https://docs.microsoft.com/en-us/aspnetcore/fundamentals/factories)