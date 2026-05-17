# Adapter Pattern - Python 範例

本資料夾包含 Adapter Pattern 的各種實作範例，幫助您理解如何在實際專案中應用轉接器模式。

## 檔案說明

| 檔案 | 說明 | 應用場景 |
|------|------|----------|
| `1_basic_concept.py` | 基本概念示範 | 理解轉接器的基本結構 |
| `2_currency_converter.py` | 幣別轉換範例 | 電子商務多幣別支援 |
| `3_payment_gateway.py` | 支付閘道整合 | 整合多家支付廠商 |
| `4_legacy_system.py` | 舊系統資料遷移 | XML → JSON 格式轉換 |
| `5_sensor_adapter.py` | 感測器統一介面 | IoT/工業自動化 |

## 執行方式

```bash
# 執行單一檔案
python 1_basic_concept.py

# 執行所有範例
for f in *.py; do echo "=== $f ==="; python "$f"; done
```

## 範例預期輸出

### 1. 基本概念
```
============================================================
Adapter Pattern - 基本概念示範
============================================================

📌 使用轉接器進行付款：
✅ 付款成功！
   交易編號: TXN123456
   金額: 99 TWD
   成功: True
```

### 2. 幣別轉換
```
📊 基礎金額: TWD 10,000 元 (電子產品)
--------------------------------------------------
  TWD    10500.0 TWD  (匯率: 1.0)
  USD     333.33 USD  (匯率: 31.5)
  EUR     307.02 EUR  (匯率: 34.2)
  JPY  50000.00 JPY  (匯率: 0.21)
```

### 3. 支付閘道
```
============================================================
📱 處理訂單: ORD1001
💰 金額: 1599.9 TWD
📝 說明: iPhone 15 手機殼
============================================================
✅ 付款成功！
   交易編號: ORD-2024-001-LinePay
   金額: 1599.9 TWD
   請點擊以下連結完成付款:
   🔗 https://linepay.example.com/pay/ORD-2024-001
```

### 4. 舊系統遷移
```json
{
  "orderId": "ORD-2024-0001",
  "createdAt": "2024-01-15T00:00:00Z",
  "customer": {
    "customerId": "C001",
    "name": "王小明",
    "contact": {
      "email": "wang@example.com",
      "phone": "0912-345-678"
    }
  },
  "lineItems": [...],
  "totalPrice": 50000,
  "orderStatus": "completed"
}
```

### 5. 感測器
```
============================================================
📊 工廠感測器統一讀取結果 (9 筆資料)
============================================================

品牌          感測器ID                      數值        單位
------------------------------------------------------------
siemens       siemens_temp_temp_1          25.60      °C
siemens       siemens_temp_temp_2          26.80      °C
siemens       siemens_humidity_humidity_1  65.50      %RH
mitsubishi    mitsubishi_temp_temp_1        24.00      °C
mitsubishi    mitsubishi_temp_temp_2        28.00      °C
mitsubishi    mitsubishi_humidity_humidity_1 68.00      %RH
omron         omron_temp_temp_1             27.50      °C
omron         omron_temp_temp_2             25.30      °C
omron         omron_humidity_humidity_1     70.20      %RH
```

## 學習重點

1. **識別不相容的介面** - 找到兩個系統間的介面差異
2. **定義目標介面** - 客戶端期望的統一介面
3. **實作轉接器** - 負責介面轉換的類別
4. **使用組合** - 轉接器持有被轉接者的實例

## 延伸閱讀

- [Refactoring Guru - Adapter Pattern](https://refactoring.guru/design-patterns/adapter)
- [Python Design Patterns - Adapter](https://python-patterns.guide/gang-of-four/adapter/)