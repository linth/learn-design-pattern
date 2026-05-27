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

### 情境四：查詢後的結果處理（QuerySet）

除了 SQL 組合外，Fluent Query Builder 搭配 **QuerySet** 類別對查詢結果進行鏈式操作。QuerySet 是一個獨立的類別（不繼承 QueryBuilder），負責包裹資料結果並提供過濾、搜尋、統計、分頁等操作。

```python
# 建立 QuerySet 進行查詢後處理
products = [...]  # 從資料庫取得的資料
qs = QuerySet(products)

# 鏈式過濾 + 統計
result = qs \
    .filter(lambda p: p.in_stock) \
    .filter(lambda p: p.price >= 10000) \
    .search(name='Galaxy')
print(result.aggregate('price'))  # {'sum': 43000, 'avg': 21500, 'max': 28000, 'min': 15000}
```

```csharp
var qs = new QuerySet<Product>(products);
var result = qs
    .Filter(p => p.InStock)
    .Filter(p => p.Price >= 10000)
    .Search("Name", "Galaxy");
var agg = result.Aggregate("Price");
// Sum=43000, Avg=21500.00, Max=28000, Min=15000
```

```typescript
const qs = new QuerySet(products);
const result = qs
  .filter((p) => p.inStock)
  .filter((p) => p.price >= 10000)
  .search({ name: 'Galaxy' });
console.log(result.aggregate('price'));
// { sum: 43000, avg: 21500, max: 28000, min: 15000 }
```

### 情境五：分頁操作（QuerySet Paginate）

QuerySet 提供內建的分頁支援，將結果集轉換為 `PaginatedResult`，包含頁碼、總頁數、上下頁判斷等資訊。

```python
page = qs.paginate(page=1, page_size=3)
print(f'第 {page.page}/{page.total_pages} 頁，共 {page.total} 筆')
for p in page.items:
    print(f'  - {p.name} (${p.price})')
```

```csharp
var page = qs.Paginate(page: 1, pageSize: 3);
Console.WriteLine($"第 {page.Page}/{page.TotalPages} 頁，共 {page.Total} 筆");
foreach (var p in page.Items)
    Console.WriteLine($"  - {p.Name} (${p.Price})");
```

```typescript
const page1 = qs.paginate(1, 3);
console.log(`第 ${page1.page}/${page1.totalPages} 頁，共 ${page1.total} 筆`);
page1.items.forEach((p) => console.log(`  - ${p.name} ($${p.price})`));
```

## QuerySet 鏈式操作清單

| 方法 | 類型 | 說明 |
|------|------|------|
| `filter(predicate)` | 鏈式 | 根據條件過濾結果 |
| `exclude(predicate)` | 鏈式 | 排除符合條件的結果 |
| `search(field, keyword)` | 鏈式 | 對指定欄位進行關鍵字搜尋 |
| `toList()` | 終端 | 取得結果列表 |
| `first()` | 終端 | 取得第一筆結果 |
| `count()` | 終端 | 取得結果筆數 |
| `aggregate(field)` | 終端 | 統計（總和、平均、最大、最小） |
| `paginate(page, pageSize)` | 終端 | 分頁回傳 PaginatedResult |

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

## QuerySet 操作示範

完整執行範例請參考各語言原始檔：

- [Python QueryBuilder](./py/fluent_query_builder.py) / [Python QuerySet](./py/queryset.py)
- [C# QueryBuilder](./cs/FluentQueryBuilder.cs) / [C# QuerySet](./cs/QuerySet.cs)
- [TypeScript QueryBuilder](./ts/fluent_query_builder.ts) / [TypeScript QuerySet](./ts/queryset.ts)

## Reference

- [refactoring.guru - Builder](https://refactoring.guru/design-patterns/builder)
- [Martin Fowler - Fluent Interface](https://martinfowler.com/bliki/FluentInterface.html)
