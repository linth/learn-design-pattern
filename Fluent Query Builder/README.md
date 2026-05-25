# Fluent Query Builder 設計模式

## 介紹說明

Fluent Query Builder 是一種基於 **方法鏈（Method Chaining）** 的設計模式，透過每個方法回傳 `this` 或自身實例，讓開發者可以用流暢、直觀的方式逐步建構複雜的查詢語句。

核心概念：
- **流暢介面（Fluent Interface）**：方法呼叫像自然語言一樣可讀
- **逐步建構（Step-by-step Construction）**：一步步加入 SELECT、FROM、WHERE 等子句
- **延遲執行（Deferred Execution）**：直到呼叫 `build()` 才產出最終結果
- **不可變性（選配）**：每次回傳新實例，避免副作用

## 使用時機

- 需要動態組合 SQL 或 DSL 查詢語句，且條件多變
- 希望提升查詢程式碼的可讀性與維護性
- 想要封裝複雜查詢邏輯，避免直接操作字串拼接
- 需要統一管理查詢參數以防止注入攻擊

## 使用情境

### 情境一：會員管理系統的動態篩選查詢

會員管理後台需要根據多種條件（狀態、註冊時間、會員等級）篩選使用者，且條件組合不固定。

```python
# 使用 Fluent Query Builder 動態組合條件
query = QueryBuilder() \
    .select('id', 'name', 'email', 'level') \
    .from_table('users') \
    .where('status', '=', 'active') \
    .and_where('level', '>=', 'gold') \
    .order_by('created_at', descending=True) \
    .limit(50) \
    .build()
```

### 情境二：電子商務商品搜尋與排序

商品列表頁需要支援多維度篩選（價格區間、分類、關鍵字）及多種排序方式（價格高至低、最新上架），並搭配分頁功能。

```python
query = QueryBuilder() \
    .select('id', 'title', 'price', 'category') \
    .from_table('products') \
    .where('price', '>', 100) \
    .and_where('category', '=', 'electronics') \
    .order_by('price', descending=True) \
    .limit(20) \
    .offset(0) \
    .build()
```

### 情境三：訂單報表與混合條件查詢

報表系統需要處理 AND / OR 混合條件的複雜查詢，例如查詢「待處理或高優先級」且「金額大於門檻值」的訂單。

```python
query = QueryBuilder() \
    .select('order_id', 'amount', 'status', 'priority') \
    .from_table('orders') \
    .where('status', '=', 'pending') \
    .or_where('priority', '=', 'high') \
    .and_where('amount', '>=', 5000) \
    .order_by('amount', descending=True) \
    .build()
```

## 優點

- **可讀性高**：鏈式呼叫接近自然語言，表達意圖明確
- **靈活性強**：可依執行時期條件動態加入或省略子句
- **安全性**：統一管理參數，方便實作參數化查詢
- **可測試性**：每個方法職責單一，容易單元測試
- **擴展性**：可輕鬆加入新的子句類型（如 JOIN、HAVING）

## 缺點

- **偵錯困難**：長鏈中任一環節出錯，不易定位
- **過度使用**：若查詢非常簡單，使用 Builder 反而增加複雜度
- **物件開銷**：每次建構可能產生較多中間物件

## Reference

- [refactoring.guru - Builder](https://refactoring.guru/design-patterns/builder)
- [Martin Fowler - Fluent Interface](https://martinfowler.com/bliki/FluentInterface.html)
