# TypeScript 全域宣告合併（Declaration Merging）問題

## 問題描述

在 `queryset.ts` 中定義了 `Product` 介面，但 TypeScript 編譯時報錯：

```
類型 '{ id: number; name: string; category: string; price: number; inStock: true; }'
在類型 'Product' 中缺少下列屬性: get_price, title, rating
```

物件字面量明明有完整的屬性，卻被要求補上 `title`、`rating`、`get_price`。

## 根因

專案根目錄的 `tsconfig.json` 未設定 `include` / `exclude`，因此 TypeScript 預設編譯 **所有 `.ts` 檔案**，全部處於**全域作用域（global scope）**。

三個不同檔案各自定義了 `Product`：

| 檔案 | 定義的屬性 |
|------|-----------|
| `queryset.ts` | `id, name, category, price, inStock` |
| `Specification Pattern/ts/specification_pattern.ts` (介面) | `id, title, price, category, inStock, rating` |
| `Law_of_Demeter/ts/shopkeepr_customer_ex.ts` (類別) | `price, get_price()` |

在 TypeScript 中，相同名稱的介面／類別在全域作用域下會進行**宣告合併（Declaration Merging）**，合併後的 `Product` 型別包含了所有屬性，導致 `queryset.ts` 中的物件字面量被視為「缺少屬性」。

## 解法

在檔案結尾加入 `export {};`，將檔案變為 **ES Module**，使其脫離全域作用域，不再與其他檔案合併：

```typescript
console.log(`價格超過 30000 的第一筆: ${first?.name ?? '無'}`);

export {};
```

## 預防方式

- 每個獨立範例檔案都加上 `export {};` 結尾，確保型別不會污染全域
- 或在 `tsconfig.json` 中明確設定 `include` / `exclude`，只編譯特定目錄
