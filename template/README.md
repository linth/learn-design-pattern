# Template Method Pattern（樣板方法模式）

## 介紹說明

樣板方法模式是一種**行為型設計模式**，在超類別中定義一個演算法的骨架（SOP），將部分步驟的實作延遲到子類別中完成。子類別可以在不改變演算法整體結構的前提下，重新定義演算法中的特定步驟。

核心概念：
- **樣板方法（Template Method）**：定義演算法骨架的公開方法，通常宣告為 `final` / `sealed` 防止子類別竄改流程
- **抽象方法（Abstract Methods）**：必須由子類別實作的步驟
- **共用方法（Concrete Methods）**：所有子類別共享的邏輯
- **掛鉤（Hook）**：提供預設行為的空白方法，子類別可選擇性覆寫來影響流程

## 使用時機

- 多個類別有相似的演算法流程，僅部分步驟不同
- 希望避免程式碼重複，將共用邏輯提取到超類別
- 需要控制子類別能擴充哪些步驟，同時保護演算法結構不被修改
- 框架設計中，讓使用者繼承框架類別並填入特定實作

## 使用情境

### 情境一：飲料自動販賣機（經典範例）

不同飲料（咖啡、茶、珍珠奶茶）的製作流程大致相同：煮水 → 沖泡 → 倒杯 → 加料。透過樣板方法模式將固定步驟（煮水、倒杯）放在基底類別，將差異化步驟（沖泡方式、配料）留給子類別實作。

```python
# 樣板方法定義了不可變的 SOP 流程
class CaffeineBeverage:
    def prepare_recipe(self):
        self.boil_water()    # 共用
        self.brew()          # 子類別實作
        self.pour_in_cup()   # 共用
        if self.customer_wants_condiments():
            self.add_condiments()  # 子類別實作（可透過 Hook 跳過）
```

### 情境二：訂單處理流程（ERP 系統）

電子商務系統中，不同類型的訂單（一般客戶、VIP、B2B）處理流程相似：計算價格 → 驗證庫存 → 建立訂單 → 發送通知。其中價格計算與通知方式因訂單類型而異，適合使用樣板方法模式。

```typescript
abstract class SaleOrderProcess {
  processOrder(): void {
    this.calculatePrice();    // 抽象：一般/ VIP / B2B 折扣不同
    this.validateOrder();
    this.checkInventory();    // 共用
    this.createOrder();       // 共用
    this.sendNotification();  // 抽象：Email / SMS / 企業通知
  }
}
```

### 情境三：資料匯出工具（報表系統）

系統需要支援多種資料匯出格式（PDF、Excel、CSV），匯出流程固定為：查詢資料 → 格式化 → 寫入檔案 → 壓縮 → 寄送 Email。其中格式化與寫入邏輯因格式而異。

```java
abstract class DataExporter {
  // 樣板方法：不可修改的匯出流程
  public final void export() {
    fetchData();
    formatData();    // 抽象：PDF / Excel / CSV 格式不同
    writeToFile();   // 抽象：寫入方式不同
    compress();      // 共用（選配，可透過 Hook 控制）
    sendEmail();     // 共用
  }
}
```

## 優點

- **程式碼重用**：共用邏輯集中在超類別，避免重複
- **結構清晰**：演算法骨架一目瞭然，子類別只關注差異化步驟
- **易於擴充**：新增品項只需繼承超類別並實作抽象方法
- **符合 OCP**：對擴展開放，對修改關閉
- **流程管控**：超類別掌控流程順序，子類別無法改變演算法結構

## 缺點

- **繼承限制**：子類別必須繼承超類別，若超類別已有其他繼承需求則衝突
- **維護負擔**：超類別修改可能影響所有子類別
- **除錯困難**：流程分散在超類別與子類別之間，追蹤較費時
- **過度使用**：簡單的流程使用樣板方法可能過度設計

## 與策略模式的區別

| 面向 | 樣板方法模式 | 策略模式 |
|------|------------|---------|
| 關係 | 繼承（is-a） | 組合（has-a） |
| 控制 | 超類別控制流程 | 用戶端選擇策略 |
| 變化 | 覆寫特定步驟 | 替換整個演算法 |
| 粒度 | 方法層級 | 物件層級 |

## Reference

- [Refactoring Guru - Template Method](https://refactoring.guru/design-patterns/template-method)
- [Head First Design Patterns - Template Method Pattern](https://www.oreilly.com/library/view/head-first-design/0596007124/)
