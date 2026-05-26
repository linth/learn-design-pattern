# Singleton Pattern（獨體模式 / 單例模式）

## 介紹說明

獨體模式是一種**生成型設計模式**，確保一個類別只有一個實例，並提供一個全域存取點來獲取該實例。它像一個全局變數，但比全局變數更安全，因為它保證只有一個實例存在。

核心概念：
- **私有建構子**：防止外部用 `new` 建立實例
- **靜態方法**：作為取得唯一實例的全域存取點
- **延遲初始化**：直到第一次使用時才建立實例（節省資源）

## 實作方式

| 方式 | 執行緒安全 | 延遲載入 | 複雜度 | 適用場景 |
|------|-----------|---------|--------|---------|
| 基本懶漢式 | ❌ | ✅ | 低 | 單執行緒 |
| 餓漢式（靜態初始化） | ✅ | ❌ | 低 | 簡單場景 |
| 雙重檢查鎖定 | ✅ | ✅ | 中 | 多執行緒 |
| `synchronized` 方法 | ✅ | ✅ | 低 | 效能要求不高 |
| 靜態內部類別（Java） | ✅ | ✅ | 低 | Java 推薦 |
| `Lazy<T>` (.NET 4+) | ✅ | ✅ | 極低 | C# 推薦 |

## 使用時機

- 系統只需一個共享資源實例（如日誌記錄器、資料庫連接池）
- 需要全域唯一的狀態管理（如設定檔、應用程式狀態）
- 物件建立成本高昂，希望重複使用同一個實例
- 需要控制資源存取，避免資源競爭

## 使用情境

### 情境一：日誌記錄器（Logger）

整個應用程式共用一個日誌實例，確保所有模組輸出到同一個日誌檔案，且避免重複開啟檔案。

```csharp
Logger logger = Logger.GetInstance();
logger.Info("應用程式啟動");
logger.Error("資料庫連線失敗");

// 任何地方取得都是同一個實例
Logger sameLogger = Logger.GetInstance();
Console.WriteLine(ReferenceEquals(logger, sameLogger)); // true
```

### 情境二：資料庫連接池

資料庫連接是昂貴資源，使用 Singleton 管理連接池可避免建立過多連線，統一管理連線的生命週期。

```java
DatabaseConnectionPool pool = DatabaseConnectionPool.getInstance();
Connection conn = pool.getConnection();
// 使用 conn 進行查詢...
pool.releaseConnection(conn);
```

### 情境三：應用程式設定管理

系統設定（如伺服器位址、API 金鑰、功能開關）應全域一致，使用 Singleton 集中管理設定值，任何模組修改設定後其他模組立即可見。

```typescript
const config = Config.getInstance();
config.set('apiUrl', 'https://api.example.com');
config.set('timeout', 30000);

// 其他地方讀取
const timeout = Config.getInstance().get('timeout');
```

## 優點

- **節省資源**：避免重複建立昂貴物件
- **全域存取**：任何地方都可取得唯一實例
- **延遲初始化**：需要時才建立，不浪費啟動時間
- **精確控制**：可控制實例的建立時機與方式

## 缺點

- **違反 SRP**：類別同時負責「保證唯一」和「業務邏輯」
- **隱藏依賴**：使用全域存取點使依賴關係不明確
- **難以測試**：Singleton 的狀態在不同測試案例間可能互相干擾
- **多執行緒問題**：需額外處理執行緒安全

## 與靜態類別的區別

| 面向 | Singleton | 靜態類別 |
|------|-----------|---------|
| 實例化 | 可延遲初始化 | 無法控制初始化時機 |
| 繼承 | 可繼承、可實作介面 | 不能繼承 |
| 多型 | 支援多型 | 不支援 |
| 物件銷毀 | 可控制生命週期 | 無法控制 |
| 依賴注入 | 可與 DI 整合 | 難以注入 |

## Reference

- [Refactoring Guru - Singleton](https://refactoring.guru/design-patterns/singleton)
- [Microsoft - Implementing Singleton in C#](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff650316(v=pandp.10))
- [Java 设计模式 (一) - 单例模式](https://www.lumin.tech/blog/design-patterns-java-1-singleton/)
