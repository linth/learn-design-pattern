"""
Adapter Pattern - 基本概念示範

轉接器模式的核心：
將一個類別的介面轉換成客戶端所期望的另一種介面

就像手機的 Type-C 轉 USB 轉接頭一樣
"""

from abc import ABC, abstractmethod
from typing import Any


# ============================================================
# 第一部分：基本結構 (不使用轉接器的困境)
# ============================================================

class OldPaymentSystem:
    """舊支付系統 - 介面不相容"""

    def process_payment(self, amount: int, currency: str) -> dict:
        """舊系統的介面：金額必須是整數，幣別必須是 ISO code"""
        return {
            "status": "success",
            "transaction_id": "TXN123456",
            "amount": amount,
            "currency": currency.upper(),
            "timestamp": "2024-01-15T10:30:00Z"
        }


class NewClient:
    """新客戶端 - 期望的介面不同"""
    # 客戶端期望：
    # - 金額可以是浮點數
    # - 幣別可以用符號（如 "$"、"€"）
    # - 回傳格式包含 success 欄位（小寫）

    def pay(self, amount: float, currency: str) -> None:
        # 問題：我們不能直接呼叫 OldPaymentSystem
        # 因為介面不相容！
        #
        # old_system.process_payment(99.9, "$")  # 會报错！
        #
        # 這時候就需要 Adapter 來幫忙轉接！
        pass


# ============================================================
# 第二部分：使用轉接器模式
# ============================================================

class TargetInterface(ABC):
    """目標介面 (Target) - 客戶端期望的介面"""

    @abstractmethod
    def pay(self, amount: float, currency: str) -> dict:
        """客戶端期望的方法"""
        pass


class PaymentAdapter(TargetInterface):
    """轉接器 (Adapter) - 將 OldPaymentSystem 轉換成 Target 介面"""

    def __init__(self, old_system: OldPaymentSystem):
        self._old_system = old_system

    def pay(self, amount: float, currency: str) -> dict:
        # ====== 轉換邏輯 ======
        # 1. 金額：浮點數 → 整數 (四捨五入)
        int_amount = int(round(amount))

        # 2. 幣別：符號 → ISO code
        currency_map = {
            "$": "USD",
            "€": "EUR",
            "£": "GBP",
            "¥": "JPY",
            "NT$": "TWD",
            "￥": "CNY"
        }
        iso_currency = currency_map.get(currency, currency.upper())

        # 3. 呼叫舊系統
        result = self._old_system.process_payment(int_amount, iso_currency)

        # 4. 回傳格式轉換：駝峰式 → 小寫
        return {
            "success": result["status"] == "success",
            "transaction_id": result["transaction_id"],
            "amount_paid": result["amount"],
            "currency_used": result["currency"],
            "time": result["timestamp"]
        }


# ============================================================
# 第三部分：執行範例
# ============================================================

def client_code(payment_system: TargetInterface) -> None:
    """客戶端程式碼 - 只需要知道 Target 介面"""
    result = payment_system.pay(99.90, "$")
    print(f"✅ 付款成功！")
    print(f"   交易編號: {result['transaction_id']}")
    print(f"   金額: {result['amount_paid']} {result['currency_used']}")
    print(f"   成功: {result['success']}")


if __name__ == "__main__":
    print("=" * 60)
    print("Adapter Pattern - 基本概念示範")
    print("=" * 60)

    # 建立舊系統
    old_system = OldPaymentSystem()

    # 建立轉接器
    adapter = PaymentAdapter(old_system)

    # 使用轉接器 (客戶端完全不需要知道舊系統的存在)
    print("\n📌 使用轉接器進行付款：")
    client_code(adapter)

    print("\n" + "=" * 60)
    print("轉接器的好處：")
    print("1. 客戶端只需要知道統一的 Target 介面")
    print("2. 不需要修改舊系統的程式碼")
    print("3. 未來要更換支付系統，只需新增轉接器")
    print("=" * 60)