"""
Adapter Pattern - 支付閘道整合範例

情境：
- 電商平台需要支援多種支付方式
- 每家支付公司的 API 介面都不同
- 需要統一介面，讓訂單系統方便使用

整合的支付廠商：
- LinePay (Line 支付的 API)
- SkuPay (街口支付的 API)
- CreditCard (信用卡支付的 API)
"""

from abc import ABC, abstractmethod
from typing import Dict, Optional
from datetime import datetime
import random


# ============================================================
# 第一部分：第三方支付 API (通常是不可修改的外部服務)
# ============================================================

class LinePayAPI:
    """Line Pay API - 第三方支付系統"""

    def send_payment_request(self, product_name: str, amount: int,
                             order_id: str, user_id: str) -> Dict:
        """
        Line Pay 的原始 API
        - 金額必須是整數
        - 需要 orderId 和 userId
        - 回傳格式包含 orderId, amount, currencyCode 等欄位
        """
        # 模擬 API 呼叫
        return {
            "returnCode": "0000",
            "returnMessage": "Success",
            "info": {
                "orderId": order_id,
                "amount": amount,
                "currencyCode": "TWD",
                "productName": product_name,
                "userId": user_id,
                "paymentUrl": f"https://linepay.example.com/pay/{order_id}"
            }
        }


class SkuPayAPI:
    """街口支付 API - 第三方支付系統"""

    def create_transaction(self, order_no: int, total_amount: float,
                          item_desc: str, callback_url: str) -> Dict:
        """
        街口支付的原始 API
        - 金額可以是浮點數
        - 使用 orderNo (數字)
        - 回傳格式包含 code, message, transactionId 等欄位
        """
        # 模擬 API 呼叫
        return {
            "code": 1,
            "message": "OK",
            "data": {
                "transaction_id": f"SKU{random.randint(100000, 999999)}",
                "order_no": order_no,
                "total_amount": total_amount,
                "item_desc": item_desc,
                "pay_token_url": f"https://skupay.example.com/pay?token={random.randint(1000, 9999)}"
            }
        }


class CreditCardAPI:
    """信用卡支付 API - 第三方支付系統"""

    def charge(self, card_number: str, cvv: str, exp_month: int,
              exp_year: int, amount: float, description: str) -> Dict:
        """
        信用卡的原始 API
        - 需要完整的卡片資訊
        - 回傳格式包含 authCode, transactionKey 等欄位
        """
        # 模擬 API 呼叫 (實際會連接到銀行系統)
        return {
            "status": "authorized",
            "authCode": f"AUTH{random.randint(1000, 9999)}",
            "transactionKey": f"TXN{random.randint(100000, 999999)}",
            "amount": amount,
            "currency": "TWD",
            "description": description,
            "timestamp": datetime.now().isoformat()
        }


# ============================================================
# 第二部分：定義標準支付介面 (Target Interface)
# ============================================================

class PaymentGateway(ABC):
    """標準支付介面 - 所有支付方式都必須實作這個介面"""

    @abstractmethod
    def pay(self, order_id: str, amount: float, description: str,
            metadata: Optional[Dict] = None) -> Dict:
        """
        統一的支付方法
        Args:
            order_id: 訂單編號
            amount: 金額
            description: 付款描述
            metadata: 額外資訊 (如使用者 ID 等)
        Returns:
            標準化的回傳格式:
            {
                "success": bool,
                "transaction_id": str,
                "amount": float,
                "message": str,
                "payment_url": Optional[str]  # 如果需要跳轉到支付頁面
            }
        """
        pass

    @abstractmethod
    def refund(self, transaction_id: str, amount: float,
               reason: str = "") -> Dict:
        """
        統一的退款方法
        """
        pass


# ============================================================
# 第三部分：轉接器實作
# ============================================================

class LinePayAdapter(PaymentGateway):
    """Line Pay 轉接器"""

    def __init__(self, line_pay_api: LinePayAPI):
        self._api = line_pay_api

    def pay(self, order_id: str, amount: float, description: str,
            metadata: Optional[Dict] = None) -> Dict:
        # ====== 轉接邏輯 ======
        # 1. 金額轉換：浮點數 → 整數
        int_amount = int(round(amount))

        # 2. 取得必要資訊
        user_id = metadata.get("user_id", "unknown") if metadata else "unknown"
        product_name = description[:50]  # Line Pay 有長度限制

        # 3. 呼叫 Line Pay API
        result = self._api.send_payment_request(
            product_name=product_name,
            amount=int_amount,
            order_id=order_id,
            user_id=user_id
        )

        # 4. 轉換為標準格式
        if result["returnCode"] == "0000":
            info = result["info"]
            return {
                "success": True,
                "transaction_id": info["orderId"],
                "amount": info["amount"],
                "message": "請使用 Line App 完成付款",
                "payment_url": info["paymentUrl"]
            }
        else:
            return {
                "success": False,
                "transaction_id": "",
                "amount": amount,
                "message": result["returnMessage"],
                "payment_url": None
            }

    def refund(self, transaction_id: str, amount: float,
               reason: str = "") -> Dict:
        # 實際應用中會呼叫 Line Pay 的退款 API
        return {
            "success": True,
            "transaction_id": f"REF{transaction_id}",
            "amount": amount,
            "message": f"已退款，原因: {reason}"
        }


class SkuPayAdapter(PaymentGateway):
    """街口支付轉接器"""

    def __init__(self, sku_pay_api: SkuPayAPI):
        self._api = sku_pay_api

    def pay(self, order_id: str, amount: float, description: str,
            metadata: Optional[Dict] = None) -> Dict:
        # ====== 轉接邏輯 ======
        # 1. 訂單編號轉換：字串 → 數字
        order_no = int(order_id.replace("ORD", ""))

        # 2. 呼叫街口支付 API
        result = self._api.create_transaction(
            order_no=order_no,
            total_amount=amount,
            item_desc=description,
            callback_url="https://myshop.com/callback/skupay"
        )

        # 3. 轉換為標準格式
        if result["code"] == 1:
            data = result["data"]
            return {
                "success": True,
                "transaction_id": data["transaction_id"],
                "amount": data["total_amount"],
                "message": "請使用街口支付 App 完成付款",
                "payment_url": data["pay_token_url"]
            }
        else:
            return {
                "success": False,
                "transaction_id": "",
                "amount": amount,
                "message": result["message"],
                "payment_url": None
            }

    def refund(self, transaction_id: str, amount: float,
               reason: str = "") -> Dict:
        return {
            "success": True,
            "transaction_id": f"REF{transaction_id}",
            "amount": amount,
            "message": f"已退款至街口帳戶，原因: {reason}"
        }


class CreditCardAdapter(PaymentGateway):
    """信用卡支付轉接器"""

    def __init__(self, credit_card_api: CreditCardAPI):
        self._api = credit_card_api
        # 測試用的信用卡資訊 (實際應用會從客戶端取得)
        self._test_card = {
            "number": "4111111111111111",
            "cvv": "123",
            "exp_month": 12,
            "exp_year": 2025
        }

    def pay(self, order_id: str, amount: float, description: str,
            metadata: Optional[Dict] = None) -> Dict:
        # ====== 轉接邏輯 ======
        # 信用卡直接扣款，不需要跳轉頁面

        result = self._api.charge(
            card_number=self._test_card["number"],
            cvv=self._test_card["cvv"],
            exp_month=self._test_card["exp_month"],
            exp_year=self._test_card["exp_year"],
            amount=amount,
            description=description
        )

        # 轉換為標準格式
        if result["status"] == "authorized":
            return {
                "success": True,
                "transaction_id": result["transactionKey"],
                "amount": result["amount"],
                "message": "信用卡扣款成功",
                "payment_url": None  # 不需要跳轉
            }
        else:
            return {
                "success": False,
                "transaction_id": "",
                "amount": amount,
                "message": "信用卡扣款失敗",
                "payment_url": None
            }

    def refund(self, transaction_id: str, amount: float,
               reason: str = "") -> Dict:
        return {
            "success": True,
            "transaction_id": f"REF{transaction_id}",
            "amount": amount,
            "message": f"已退回信用卡，原因: {reason}"
        }


# ============================================================
# 第四部分：支付工廠 (配合工廠模式使用)
# ============================================================

class PaymentFactory:
    """支付工廠 - 根據選擇建立不同的支付轉接器"""

    @staticmethod
    def create_gateway(payment_type: str) -> PaymentGateway:
        """
        建立支付閘道轉接器
        Args:
            payment_type: "linepay", "skupay", "creditcard"
        """
        gateways = {
            "linepay": lambda: LinePayAdapter(LinePayAPI()),
            "skupay": lambda: SkuPayAdapter(SkuPayAPI()),
            "creditcard": lambda: CreditCardAdapter(CreditCardAPI())
        }

        creator = gateways.get(payment_type.lower())
        if creator:
            return creator()
        raise ValueError(f"不支援的支付方式: {payment_type}")


# ============================================================
# 第五部分：執行範例
# ============================================================

def process_payment(gateway: PaymentGateway, order_id: str,
                   amount: float, description: str) -> None:
    """處理支付 - 客戶端程式碼"""

    print(f"\n{'='*60}")
    print(f"📱 處理訂單: {order_id}")
    print(f"💰 金額: {amount} TWD")
    print(f"📝 說明: {description}")
    print(f"{'='*60}")

    # 呼叫統一的支付介面
    result = gateway.pay(
        order_id=order_id,
        amount=amount,
        description=description,
        metadata={"user_id": "USER123"}
    )

    if result["success"]:
        print(f"✅ 付款成功！")
        print(f"   交易編號: {result['transaction_id']}")
        print(f"   金額: {result['amount']} TWD")
        if result["payment_url"]:
            print(f"   請點擊以下連結完成付款:")
            print(f"   🔗 {result['payment_url']}")
    else:
        print(f"❌ 付款失敗: {result['message']}")

    print()


if __name__ == "__main__":
    print("=" * 80)
    print("Adapter Pattern - 支付閘道整合範例")
    print("=" * 80)

    # 測試不同支付方式
    payment_types = ["linepay", "skupay", "creditcard"]

    for ptype in payment_types:
        # 使用工廠建立轉接器
        gateway = PaymentFactory.create_gateway(ptype)

        # 模擬訂單
        order_id = f"ORD{1001}"
        amount = 1599.90
        description = "iPhone 15 手機殼"

        process_payment(gateway, order_id, amount, description)

    print("\n🎯 重點說明：")
    print("1. 訂單系統只需要知道 PaymentGateway 介面")
    print("2. 新增支付方式時，只需要實作對應的 Adapter")
    print("3. 不需要修改訂單系統的程式碼")
    print("4. 轉接器內部處理各 API 的差異")
    print("=" * 80)