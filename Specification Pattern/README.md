# Specification Pattern（規格模式）

## 介紹說明

Specification Pattern 是一種**商務規則組合模式**，將每個判斷邏輯封裝成獨立的規格類別（Specification），並透過 AND、OR、NOT 等邏輯運算靈活地組合這些規格，以建立複雜的篩選或驗證條件。

核心概念：
- **規格（Specification）**：一個 `isSatisfiedBy()` 方法，判斷物件是否符合規則
- **組合（Composition）**：透過 `And`、`Or`、`Not` 組合多個規格，像積木一樣任意搭配
- **分離關注點**：商務邏輯與過濾/驗證機制分離，程式碼更乾淨

## 使用時機

- 商務規則頻繁變動，需要靈活組合不同條件
- 篩選邏輯散布在多處，希望統一管理與重用
- 需要避免大量 if-else 或巢狀條件判斷
- 領域驅動設計（DDD）中，將商務規則顯式建模為第一等公民

## 使用情境

### 情境一：電商商品篩選（多維度條件組合）

商品列表頁需根據分類、價格區間、庫存狀態、評分等多個維度進行篩選，且使用者可任意組合。使用 Specification Pattern 可將每個維度獨立為規格，動態組合。

```python
# 組合規格：手機分類 + 價格 25000~40000
spec = CategorySpecification('手機') & PriceSpecification(25000, 40000)
results = ProductFilter.filter_by_spec(products, spec)
```

### 情境二：會員資格驗證（複合條件判斷）

訂閱制服務需要判斷使用者是否符合某個促銷資格，例如「付費會員」且「加入滿 30 天」且「未被標記為高風險」。

```python
spec = PaidMemberSpecification() \
     & MemberSinceSpecification(days=30) \
     & ~HighRiskSpecification()
```

### 情境三：訂單出貨規則引擎（動態規則組合）

物流系統需根據訂單類型、金額區間、配送地區決定出貨方式（常溫／冷凍／快遞）。規則可能隨時調整，使用 Specification 可避免硬編碼。

```python
spec = (CategorySpecification('生鮮') & AmountSpecification(min=500)) \
     | VIPSpecification()
# 滿足條件者適用冷鏈配送
```

## 優點

- **高組合性**：規格像樂高積木，可任意 AND / OR / NOT 組合
- **遵循開閉原則**：新增規格不需修改既有程式碼
- **提高可讀性**：規格名稱本身就是文件，表達意圖清楚
- **易於測試**：每個規格獨立，單元測試簡單明確
- **集中管理**：所有商務規則集中在規格類別中，不四散各處

## 缺點

- **類別數量膨脹**：每個條件都是一個類別，可能產生大量小類別
- **過度設計風險**：簡單的 if 判斷就能解決時，引入規格模式反而增加複雜度
- **組合爆炸**：極複雜的規則可能產生深層巢狀組合，不易除錯

## Reference

- [Martin Fowler - Specification Pattern](https://martinfowler.com/apsupp/spec.pdf)
- [Eric Evans - Domain-Driven Design](https://domainlanguage.com/ddd/)
