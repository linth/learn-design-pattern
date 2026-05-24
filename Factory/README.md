# Factory Pattern (工廠模式)

## 概述

工廠模式是一種**建立型設計模式**，提供一個建立物件的介面，讓子類別決定要實例化哪個類別。它將物件的建立過程封裝起來，使客戶端不需要知道具體的產品類別。

> 口訣：**定義一個建立物件的介面，讓子類別決定實例化哪個類別**

## 為什麼使用工廠模式？

| 優點 | 說明 |
|------|------|
| **解耦** | 客戶端與具體產品類別分離 |
| **開放封閉原則** | 新增產品不需要修改既有程式碼 |
| **單一職責原則** | 建立物件的邏輯集中在工廠中 |
| **易於測試** | 可以輕鬆使用 Mock 物件替換 |
| **統一管理** | 所有物件的建立都集中在工廠 |

## 三種工廠模式

### 1. 簡單工廠 (Simple Factory)
- 一個工廠類別包含條件判斷來建立不同產品
- 最基礎的形式，不是真正的設計模式，但廣為使用
- 適合產品種類較少、不常變動的場景

### 2. 工廠方法 (Factory Method)
- 定義一個抽象的工廠方法，由子類別實作
- 每個產品對應一個工廠子類別
- 符合開放封閉原則，擴展時不需要修改工廠

### 3. 抽象工廠 (Abstract Factory)
- 建立一系列相關或依賴物件的介面
- 工廠可以產生多種產品族
- 適合產品之間有關聯性或需要搭配使用的場景

## 結構

```
┌─────────────┐     ┌──────────────────┐
│   Client    │────>│    Creator       │ (抽象)
└─────────────┘     │──────────────────│
                    │+ factoryMethod() │<│抽象方法
                    │+ someOperation() │ │
                    └────────┬─────────┘ │
                             │            │
              ┌──────────────┴──────────┐ │
              │                         │ │
    ┌─────────┴─────────┐   ┌───────────┴───────┐
    │ ConcreteCreator1  │   │ ConcreteCreator2  │
    │───────────────────│   │───────────────────│
    │+ factoryMethod()  │   │+ factoryMethod()  │
    │  return new ProdA │   │  return new ProdB │
    └─────────┬─────────┘   └─────────┬─────────┘
              │                       │
              ▼                       ▼
    ┌─────────────────┐   ┌───────────────────┐
    │ ProductA        │   │ ProductB          │
    │ (implements)    │   │ (implements)      │
    └─────────────────┘   └───────────────────┘
              ▲                       ▲
              │                       │
              └──────────┬────────────┘
                         │
                ┌────────┴────────┐
                │  Product        │ (介面/抽象類別)
                │─────────────────│
                │+ operation()    │
                └─────────────────┘
```

## 使用時機

當你遇到以下情況時可以考慮使用工廠模式：

1. **物件建立邏輯複雜** — 建立物件需要多個步驟或依賴特定條件
2. **需要降低耦合** — 客戶端不應該知道具體實作的類別名稱
3. **產品種類可能擴展** — 未來可能會新增產品類型
4. **物件建立需要集中管理** — 統一管理物件的建立方式
5. **框架或函式庫設計** — 讓使用者擴展框架功能

## 應用場景

| 領域 | 範例 |
|------|------|
| 🏪 **電子商務** | 支付閘道 (LinePay, 信用卡, PayPal)、物流方式、優惠券類型 |
| 📄 **文件處理** | 報告匯出 (PDF, Excel, Word, HTML)、資料序列化 (JSON, XML) |
| 🔔 **通知系統** | 多管道通知 (Email, SMS, LINE, Push)、Webhook 觸發 |
| 🎮 **遊戲開發** | 角色創建 (戰士、法師、弓箭手)、技能工廠 |
| 🗄️ **資料庫** | 資料庫連線工廠 (MySQL, PostgreSQL, MongoDB) |
| 📝 **日誌系統** | 日誌記錄器 (Console, File, Database) |
| 🖼️ **圖片處理** | 圖片格式工廠 (PNG, JPG, WebP) |

---

## 程式碼範例

### C#

目錄：[`cs/`](cs/)

涵蓋 5 個實作，從基礎到進階：

| 範例 | 說明 |
|------|------|
| `1_BasicFactory.cs` | 基本簡單工廠 — String switch 與 Dictionary 雙寫法 |
| `2_PizzaStore.cs` | Factory Method 經典披薩店 — 各地區分店自訂風味 |
| `3_PaymentGateway.cs` | 支付閘道工廠 — LinePay / 信用卡 / PayPal |
| `4_DocumentFactory.cs` | 文件產生器 — PDF / HTML / Markdown / JSON |
| `5_NotificationFactory.cs` | 通知服務 — Email / SMS / LINE / Push / Webhook |

**執行：**
```bash
cd Factory/cs
dotnet run
```

---

### Java

目錄：[`java/`](java/)

| 檔案 | 說明 |
|------|------|
| `Factory.java` | 工廠方法模式 — 中式與美式食物工廠 (ChineseFoodFactory / AmericanFoodFactory) |
| `SimpleFactory.java` | 簡單工廠 — `FoodFactory.makeFood()` 靜態方法 |
| `JapanNoodle.java` | 具體產品 — 日式拉麵，實作 `addSpicy()` |
| `TaiwanChicken.java` | 具體產品 — 台灣雞肉，實作 `addCondiment()` |
| `food/Food.java` | 抽象產品基底類別 |
| `food/FoodInterface.java` | 產品介面 |

**執行：**
```bash
cd Factory/java
javac java/Factory.java
java java.Factory
```

---

### Python

目錄：[`py/`](py/)

| 檔案 | 說明 |
|------|------|
| `pizza.py` | 簡單工廠 + PizzaStore 經典範例 — `SimplePizzaFactory` 搭配 `PizzaStore` |
| `factory-basic.py` | 參考資料彙整 (說明文件) |
| `3-tier-class-arch.py` | 三層式架構範例 (Data → BusinessLogic → UI) |
| `function-arch.py` | 函數式架構 (非工廠模式，展示另一種程式組織方式) |

**執行：**
```bash
cd Factory/py
python pizza.py
```

---

### TypeScript

目錄：[`ts/`](ts/)

| 檔案 | 說明 |
|------|------|
| `Conceptual-example.ts` | Factory Method 概念範例 — `Creator` + `ConcreteCreator` |
| `animal-ex.ts` | 動物工廠 — `AnimalFactory` 建立 Dog / Cat |
| `factory-real-world-ex.ts` | 真實世界範例 — 抽象工廠、資料庫連線、單例模式 |
| `factory_method-3tair.ts` | 三層設計 — interface → abstract → concrete |
| `base/game-roles-ex.ts` | 遊戲角色工廠 — Warrior / Mage 角色與技能工廠 |

**執行：**
```bash
cd Factory/ts
npx ts-node Conceptual-example.ts
npx ts-node animal-ex.ts
npx ts-node factory_method-3tair.ts
npx ts-node base/game-roles-ex.ts
```

---

## 與其他模式的比較

| 模式 | 目的 | 使用時機 |
|------|------|----------|
| **Simple Factory** | 集中建立物件 | 產品種類少且固定 |
| **Factory Method** | 延遲建立到子類別 | 需要讓子類別決定產品類型 |
| **Abstract Factory** | 建立產品族 | 需要建立一系列相關產品 |
| **Builder** | 分步驟建立複雜物件 | 產品需要多步驟組裝 |
| **Prototype** | 複製既有物件 | 建立物件的成本高 |

## 參考資源

- [Refactoring Guru - Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [Refactoring Guru - Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
- [Microsoft Docs - Factory Pattern](https://docs.microsoft.com/en-us/aspnetcore/fundamentals/factories)
- 《Head First 設計模式》— 第 4 章 工廠模式
