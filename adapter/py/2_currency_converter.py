"""
Adapter Pattern - 電子商務幣別轉換範例

情境：
- 系統原本只支援 TWD (新台幣) 計算
- 現在需要支援 USD, EUR, JPY, CNY 等多種幣別
- 不能修改原有的 TWD 計算邏輯
"""

from abc import ABC, abstractmethod
from typing import Dict


# ============================================================
# 第一部分：現有的 TWD 計算系統 (不可修改)
# ============================================================

class TWDCalculator:
    """現有的 TWD 金額計算系統 (無法修改)"""

    def calculate(self, amount: float, product_type: str = "normal") -> float:
        """
        計算最終金額 (僅支援 TWD)
        - 一般商品：原價
        - 電子產品：加 5% 稅
        - 進口商品：加 10% 關稅
        """
        tax_rates = {
            "normal": 1.0,
            "electronic": 1.05,
            "imported": 1.10
        }
        rate = tax_rates.get(product_type, 1.0)
        return round(amount * rate, 2)


# ============================================================
# 第二部分：定義標準介面 (Target Interface)
# ============================================================

class CurrencyCalculator(ABC):
    """貨幣計算介面 - 客戶端期望的標準介面"""

    @abstractmethod
    def calculate(self, amount: float, currency: str, product_type: str = "normal") -> Dict:
        """
        計算最終金額
        Args:
            amount: 金額
            currency: 幣別 (如 "USD", "EUR", "TWD")
            product_type: 商品類型
        Returns:
            包含原始金額、匯率、計算後金額等資訊的字典
        """
        pass


# ============================================================
# 第三部分：轉接器實作
# ============================================================

class CurrencyAdapter(CurrencyCalculator):
    """幣別轉接器 - 將 TWD 計算機轉換成多幣別支援"""

    # 匯率 (實際應用中會從 API 獲取)
    EXCHANGE_RATES = {
        "USD": 31.5,   # 1 USD = 31.5 TWD
        "EUR": 34.2,   # 1 EUR = 34.2 TWD
        "JPY": 0.21,   # 1 JPY = 0.21 TWD
        "CNY": 4.35,   # 1 CNY = 4.35 TWD
        "GBP": 39.8,   # 1 GBP = 39.8 TWD
        "TWD": 1.0     # 1 TWD = 1 TWD
    }

    def __init__(self, twd_calculator: TWDCalculator):
        self._twd_calculator = twd_calculator

    def calculate(self, amount: float, currency: str, product_type: str = "normal") -> Dict:
        # ====== 轉接邏輯 ======

        # 1. 將輸入金額轉換為 TWD
        twd_amount = self._convert_to_twd(amount, currency)

        # 2. 使用原有的 TWD 計算系統
        twd_result = self._twd_calculator.calculate(twd_amount, product_type)

        # 3. 將結果轉換回目標幣別
        final_amount = self._convert_from_twd(twd_result, currency)

        # 4. 回傳完整資訊
        return {
            "original_amount": amount,
            "original_currency": currency,
            "twd_amount": twd_amount,
            "product_type": product_type,
            "tax_included": True,
            "final_amount": final_amount,
            "final_currency": currency,
            "exchange_rate": self.EXCHANGE_RATES.get(currency, 1.0)
        }

    def _convert_to_twd(self, amount: float, currency: str) -> float:
        """將其他幣別轉換為 TWD"""
        rate = self.EXCHANGE_RATES.get(currency, 1.0)
        return amount * rate

    def _convert_from_twd(self, twd_amount: float, currency: str) -> float:
        """將 TWD 轉換為其他幣別"""
        if currency == "TWD":
            return twd_amount
        rate = self.EXCHANGE_RATES.get(currency, 1.0)
        return round(twd_amount / rate, 2)


# ============================================================
# 第四部分：客戶端使用
# ============================================================

def display_order_summary(calculator: CurrencyCalculator) -> None:
    """顯示訂單摘要 - 客戶端程式碼"""

    # 模擬購物車中的商品
    items = [
        {"name": "iPhone 15", "price": 999.00, "product_type": "electronic", "currency": "USD"},
        {"name": "Nike 運動鞋", "price": 150.00, "product_type": "normal", "currency": "EUR"},
        {"name": "Sony 耳機", "price": 25000, "product_type": "electronic", "currency": "JPY"},
        {"name": "法國紅酒", "price": 89.90, "product_type": "imported", "currency": "EUR"},
        {"name": "台灣鳳梨酥", "price": 580, "product_type": "normal", "currency": "TWD"},
    ]

    print("\n" + "=" * 80)
    print(f"{'商品名稱':<20} {'原價':<12} {'商品類型':<12} {'最終金額':<15}")
    print("-" * 80)

    total = 0
    for item in items:
        result = calculator.calculate(
            amount=item["price"],
            currency=item["currency"],
            product_type=item["product_type"]
        )
        print(f"{item['name']:<20} {item['price']:>8} {item['currency']:<4} "
              f"{item['product_type']:<12} {result['final_amount']:>10} {item['currency']:<4}")
        total += result["final_amount"]

    print("-" * 80)
    print(f"{'總計':<44} {total:>10} TWD")
    print("=" * 80)


# 額外範例：統一顯示貨幣
def show_price_examples(calculator: CurrencyCalculator) -> None:
    """展示不同幣別的轉換結果"""

    base_price = 10000  # TWD 10000

    currencies = ["TWD", "USD", "EUR", "JPY", "CNY", "GBP"]

    print("\n📊 基礎金額: TWD 10,000 元 (電子產品)")
    print("-" * 50)

    for curr in currencies:
        result = calculator.calculate(
            amount=base_price,
            currency=curr,
            product_type="electronic"
        )
        print(f"  {curr:4} {result['final_amount']:>10} {curr:3}  "
              f"(匯率: {result['exchange_rate']})")

    print()


if __name__ == "__main__":
    print("=" * 80)
    print("Adapter Pattern - 電子商務幣別轉換範例")
    print("=" * 80)

    # 建立原有的 TWD 計算系統 (不可修改)
    twd_calculator = TWDCalculator()

    # 建立轉接器，讓系統支援多幣別
    currency_adapter = CurrencyAdapter(twd_calculator)

    # 展示轉換結果
    show_price_examples(currency_adapter)

    # 展示訂單摘要
    display_order_summary(currency_adapter)

    print("\n🎯 重點說明：")
    print("1. 原有 TWDCalculator 完全不需要修改")
    print("2. 新增 CurrencyAdapter 來處理多幣別轉換")
    print("3. 客戶端只需要知道 CurrencyCalculator 介面")
    print("4. 未來要更換匯率來源，只需修改 Adapter 中的 EXCHANGE_RATES")
    print("=" * 80)