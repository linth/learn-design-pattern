# State Pattern（狀態模式）

## 介紹說明

狀態模式是一種**行為型設計模式**，允許物件在內部狀態改變時改變其行為，彷彿換了一個類別。它將每個狀態的邏輯封裝到獨立的類別中，並將行為委託給當前的狀態物件。

核心概念：
- **環境類別（Context）**：持有當前狀態物件的參考，對外提供統一的介面
- **狀態介面（State Interface）**：定義所有狀態共有的操作
- **具體狀態（Concrete State）**：實作特定狀態下的行為，並管理狀態轉換

## 使用時機

- 物件行為取決於其狀態，且狀態數量較多（通常 ≥ 3）
- 狀態轉換規則複雜且可能會持續擴充
- 程式碼中存在大量根據狀態判斷的 if-else / switch-case
- 各狀態下的行為差異明顯，希望將狀態特定行為集中管理

## 使用情境

### 情境一：電商訂單生命週期管理（經典範例）

訂單從建立到完成經歷多個狀態：新訂單 → 已付款 → 已出貨 → 已送達。每個狀態下允許的操作不同（例如未付款不能出貨），且狀態可被取消。

```
狀態圖:
  New ──pay──→ Paid ──ship──→ Shipped ──deliver──→ Delivered
   │             │                                      │
   └──cancel──→ Cancelled ←──cancel─────────────────────┘
```

```csharp
var order = new Order();
order.PayOrder();     // ✅ 付款成功 → 轉為 PaidState
order.ShipOrder();    // ✅ 已出貨 → 轉為 ShippedState
order.DeliverOrder(); // ✅ 已送達 → 轉為 DeliveredState
order.PayOrder();     // ❌ 最終狀態不允許付款
```

### 情境二：文件編輯器模式切換

文檔編輯器有多種編輯模式（選擇、編輯、預覽），每種模式下滑鼠點擊、鍵盤輸入、渲染行為都不同。

```typescript
const editor = new Editor();
editor.setState(new SelectMode());
editor.handleMouseClick(); // 選擇模式 - 框選文字

editor.setState(new EditMode());
editor.handleMouseClick(); // 編輯模式 - 移動游標

editor.setState(new PreviewMode());
editor.handleMouseClick(); // 預覽模式 - 無操作
```

### 情境三：紅綠燈號誌控制

紅綠燈在紅燈 → 綠燈 → 黃燈之間循環切換，每個燈號的行為（顯示訊息、停留時間）可封裝在各自狀態中。

```typescript
const light = new TrafficLight();
light.change(); // 🔴 紅燈：停止
light.change(); // 🟢 綠燈：前進
light.change(); // 🟡 黃燈：準備停止
```

## 狀態圖 vs. 狀態模式

| 面向 | 狀態圖 (State Diagram) | 狀態模式 (State Pattern) |
|------|----------------------|------------------------|
| 本質 | 建模工具 | 設計模式 |
| 用途 | 視覺化狀態與轉換 | 實作物件的狀態行為 |
| 產出 | 圖表 | 程式碼 |
| 關係 | 狀態模式可用來實作狀態圖描述的行為 |

## 優點

- **符合 SRP**：每個狀態的行為集中在單一類別
- **符合 OCP**：新增狀態不需修改既有狀態或 Context
- **消除條件判斷**：取代複雜的 if-else / switch-case
- **狀態轉換明確**：每個狀態清楚定義自己能轉換到哪些狀態

## 缺點

- **類別數量增加**：每個狀態都是一個類別
- **轉換邏輯分散**：狀態轉換散布在各狀態類別中，可能難以總覽全貌
- **過度設計風險**：簡單的列舉 + if 就能解決時不宜使用

## 與策略模式的區別

| 面向 | 狀態模式 | 策略模式 |
|------|---------|---------|
| 目的 | 管理狀態轉換與行為 | 替換演算法 |
| 狀態 | Context 內部自動切換 | 由客戶端選擇策略 |
| 關聯 | 狀態間彼此知道轉換目標 | 策略間互相獨立 |
| 行為數量 | 一組完整操作集 | 單一操作 |

## Reference

- [Refactoring Guru - State](https://refactoring.guru/design-patterns/state)
- [Head First Design Patterns - State Pattern](https://www.oreilly.com/library/view/head-first-design/0596007124/)
