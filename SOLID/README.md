# SOLID 原則

## 介紹說明

SOLID 是物件導向設計的五個基本原則，由 Robert C. Martin（Uncle Bob）提出，旨在讓軟體更容易維護、擴展和理解。五個原則分別為：

| 簡稱 | 全名 | 中文 |
|------|------|------|
| **S** | Single Responsibility Principle | 單一職責原則 |
| **O** | Open/Closed Principle | 開放封閉原則 |
| **L** | Liskov Substitution Principle | 里氏替換原則 |
| **I** | Interface Segregation Principle | 介面隔離原則 |
| **D** | Dependency Inversion Principle | 依賴反轉原則 |

## 各原則說明

### S - 單一職責原則（Single Responsibility Principle）

一個類別應該只有一個理由被修改，即只負責一項職責。

**使用時機**：
- 類別功能越來越多，修改頻率過高
- 一個類別因多種不同原因需要修改
- 類別過大，難以理解和測試

### O - 開放封閉原則（Open/Closed Principle）

軟體實體應對擴展開放，對修改關閉。新增功能時應透過擴充而非修改既有程式碼。

**使用時機**：
- 系統需要頻繁新增功能或型別
- 希望降低修改既有程式碼帶來的風險
- 需要設計可擴充的框架或函式庫

### L - 里氏替換原則（Liskov Substitution Principle）

子型別必須能完全取代父型別，且不改變程式的正確性。

**使用時機**：
- 設計繼承層次結構時
- 使用多型處理不同子類別時
- 確保子類別不違反父類別的契約約束

### I - 介面隔離原則（Interface Segregation Principle）

客戶端不應被迫依賴它們不使用的方法。應將大型介面拆分為多個小型專用介面。

**使用時機**：
- 介面過大，實作類別被迫實作不需要的方法
- 不同客戶端需要介面的不同部分
- 介面變更影響大量不相關的類別

### D - 依賴反轉原則（Dependency Inversion Principle）

高層模組不應依賴低層模組，兩者都應依賴抽象。抽象不應依賴細節，細節應依賴抽象。

**使用時機**：
- 高層程式碼直接依賴低層實作，難以替換或測試
- 需要解耦系統中的元件
- 希望支援依賴注入（DI）與單元測試（Mock）

## 使用情境（三個實戰場景）

### 情境一：重構購物車系統（SRP + OCP）

初期訂單處理全部寫在一個巨無霸 `OrderService` 類別中，包含驗證、計算價格、存檔、寄信。違反 SRP 導致每次修改其中一個流程都可能影響其他功能。

```csharp
// 重構後：拆分成多個專責類別
public class OrderValidator { /* 僅負責驗證 */ }
public class PriceCalculator { /* 僅負責價格計算 */ }
public class OrderRepository { /* 僅負責資料存取 */ }
public class EmailNotifier { /* 僅負責寄信通知 */ }

// 新增折扣方案時不需修改既有程式碼（OCP）
public interface IDiscountStrategy { decimal Apply(decimal price); }
public class SeasonalDiscount : IDiscountStrategy { /* 季節折扣 */ }
public class VIPDiscount : IDiscountStrategy { /* VIP 折扣 */ }
```

### 情境二：報表產生器重構（LSP + ISP）

原本一個 `IReport` 介面要求所有報表都實作 `GeneratePdf()`、`GenerateExcel()`、`GenerateCsv()` 方法，但某些報表只需要部分格式。

```csharp
// ISP：拆分為多個專用介面
public interface IPdfExportable { byte[] GeneratePdf(); }
public interface IExcelExportable { byte[] GenerateExcel(); }
public interface ICsvExportable { string GenerateCsv(); }

// 每個報表只實作需要的介面
public class SalesReport : IPdfExportable, IExcelExportable { }
public class SummaryReport : ICsvExportable { }
```

### 情境三：通知系統搭配依賴注入（DIP）

系統需要支援多種通知方式（Email、SMS、Push），且日後可能增加新的通知渠道。

```csharp
// 高層與低層都依賴抽象介面
public interface INotifier { void Send(string message); }

// 低層實作
public class EmailNotifier : INotifier { }
public class SmsNotifier : INotifier { }

// 高層透過抽象依賴，不直接 new 具體類別
public class NotificationService
{
    private readonly INotifier _notifier;
    public NotificationService(INotifier notifier) // 建構子注入
    {
        _notifier = notifier;
    }
    public void Notify(string message) => _notifier.Send(message);
}
```

## 參考資料

- [Clean Architecture - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Refactoring Guru - SOLID](https://refactoring.guru/design-patterns/solid)
- [Wikipedia - SOLID](https://en.wikipedia.org/wiki/SOLID)
