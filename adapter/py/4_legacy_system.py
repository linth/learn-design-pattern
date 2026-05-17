"""
Adapter Pattern - 舊系統資料遷移範例

情境：
- 公司從舊系統升級到新系統
- 舊系統使用 XML 格式儲存資料
- 新系統使用 JSON 格式
- 需要在不修改舊系統的情況下遷移資料
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any
from datetime import datetime
import json


# ============================================================
# 第一部分：舊系統 (XML) - 不可修改
# ============================================================

class LegacyXMLReader:
    """舊系統的 XML 資料讀取器 (不可修改)"""

    def __init__(self):
        # 模擬從資料庫或檔案讀取的 XML 資料
        self._xml_data = """
        <?xml version="1.0" encoding="UTF-8"?>
        <orders>
            <order>
                <order_no>ORD-2024-001</order_no>
                <order_date>2024-01-15</order_date>
                <customer>
                    <cust_id>C001</cust_id>
                    <name>王小明</name>
                    <email>wang@example.com</email>
                    <phone>0912-345-678</phone>
                </customer>
                <items>
                    <item>
                        <product_code>P001</product_code>
                        <product_name>iPhone 15</product_name>
                        <quantity>1</quantity>
                        <unit_price>35000</unit_price>
                    </item>
                    <item>
                        <product_code>P002</product_code>
                        <product_name>AirPods Pro</product_name>
                        <quantity>2</quantity>
                        <unit_price>7500</unit_price>
                    </item>
                </items>
                <total_amount>50000</total_amount>
                <status>completed</status>
            </order>
            <order>
                <order_no>ORD-2024-002</order_no>
                <order_date>2024-01-16</order_date>
                <customer>
                    <cust_id>C002</cust_id>
                    <name>李小華</name>
                    <email>lee@example.com</email>
                    <phone>0988-888-888</phone>
                </customer>
                <items>
                    <item>
                        <product_code>P003</product_code>
                        <product_name>MacBook Pro</product_name>
                        <quantity>1</quantity>
                        <unit_price>65000</unit_price>
                    </item>
                </items>
                <total_amount>65000</total_amount>
                <status>pending</status>
            </order>
        </orders>
        """

    def get_orders_as_xml(self) -> str:
        """回傳 XML 格式的訂單資料"""
        return self._xml_data

    def parse_xml(self, xml_string: str) -> List[Dict]:
        """解析 XML (實際應用會用 xml.etree.ElementTree 或 lxml)"""
        # 簡化的 XML 解析 (實際會更複雜)
        orders = []

        # 模擬解析過程
        # 實際專案會使用: import xml.etree.ElementTree as ET
        # tree = ET.fromstring(xml_string)

        # 這裡直接回傳模擬的字典格式
        return [
            {
                "order_no": "ORD-2024-001",
                "order_date": "2024-01-15",
                "customer": {
                    "cust_id": "C001",
                    "name": "王小明",
                    "email": "wang@example.com",
                    "phone": "0912-345-678"
                },
                "items": [
                    {
                        "product_code": "P001",
                        "product_name": "iPhone 15",
                        "quantity": 1,
                        "unit_price": 35000
                    },
                    {
                        "product_code": "P002",
                        "product_name": "AirPods Pro",
                        "quantity": 2,
                        "unit_price": 7500
                    }
                ],
                "total_amount": 50000,
                "status": "completed"
            },
            {
                "order_no": "ORD-2024-002",
                "order_date": "2024-01-16",
                "customer": {
                    "cust_id": "C002",
                    "name": "李小華",
                    "email": "lee@example.com",
                    "phone": "0988-888-888"
                },
                "items": [
                    {
                        "product_code": "P003",
                        "product_name": "MacBook Pro",
                        "quantity": 1,
                        "unit_price": 65000
                    }
                ],
                "total_amount": 65000,
                "status": "pending"
            }
        ]


# ============================================================
# 第二部分：新系統介面 (Target Interface)
# ============================================================

class DataConverter(ABC):
    """資料轉換介面 - 新系統期望的格式"""

    @abstractmethod
    def convert_orders(self) -> List[Dict]:
        """
        轉換訂單資料
        Returns:
            新系統期望的 JSON 格式:
            [
                {
                    "orderId": "string",
                    "createdAt": "ISO8601 datetime",
                    "customer": {
                        "customerId": "string",
                        "name": "string",
                        "contact": {
                            "email": "string",
                            "phone": "string"
                        }
                    },
                    "lineItems": [
                        {
                            "productId": "string",
                            "name": "string",
                            "quantity": "number",
                            "price": "number"
                        }
                    ],
                    "totalPrice": "number",
                    "orderStatus": "string (pending|processing|completed|cancelled)"
                }
            ]
        """
        pass

    @abstractmethod
    def export_to_json(self, filepath: str) -> bool:
        """匯出為 JSON 檔案"""
        pass


# ============================================================
# 第三部分：轉接器實作
# ============================================================

class LegacyToJsonAdapter(DataConverter):
    """舊系統 XML 轉新系統 JSON 的轉接器"""

    # 狀態映射表 (舊系統 → 新系統)
    STATUS_MAP = {
        "completed": "completed",
        "pending": "pending",
        "cancelled": "cancelled",
        "processing": "processing",
        "shipped": "processing"
    }

    def __init__(self, legacy_reader: LegacyXMLReader):
        self._legacy = legacy_reader
        self._converted_data: List[Dict] = []

    def convert_orders(self) -> List[Dict]:
        """執行轉換邏輯"""

        # 1. 讀取舊系統 XML 資料
        raw_orders = self._legacy.parse_xml(
            self._legacy.get_orders_as_xml()
        )

        # 2. 轉換為新系統格式
        self._converted_data = []
        for order in raw_orders:
            converted_order = self._convert_single_order(order)
            self._converted_data.append(converted_order)

        return self._converted_data

    def _convert_single_order(self, old_order: Dict) -> Dict:
        """轉換單筆訂單"""

        # 轉換訂單編號格式
        # 舊: ORD-2024-001 → 新: ORD-2024-0001
        order_id = self._format_order_id(old_order["order_no"])

        # 轉換日期格式
        # 舊: 2024-01-15 → 新: 2024-01-15T00:00:00Z
        created_at = self._format_datetime(old_order["order_date"])

        # 轉換客戶資料結構
        customer = {
            "customerId": old_order["customer"]["cust_id"],
            "name": old_order["customer"]["name"],
            "contact": {
                "email": old_order["customer"]["email"],
                "phone": old_order["customer"]["phone"]
            }
        }

        # 轉換商品資料結構
        line_items = []
        for item in old_order["items"]:
            line_items.append({
                "productId": item["product_code"],
                "name": item["product_name"],
                "quantity": item["quantity"],
                "price": item["unit_price"]
            })

        # 轉換訂單狀態
        old_status = old_order["status"].lower()
        order_status = self.STATUS_MAP.get(old_status, "pending")

        return {
            "orderId": order_id,
            "createdAt": created_at,
            "customer": customer,
            "lineItems": line_items,
            "totalPrice": old_order["total_amount"],
            "orderStatus": order_status
        }

    def _format_order_id(self, old_id: str) -> str:
        """格式化訂單編號"""
        # ORD-2024-001 → ORD-2024-0001
        parts = old_id.split("-")
        if len(parts) == 3:
            return f"{parts[0]}-{parts[1]}-{int(parts[2]):04d}"
        return old_id

    def _format_datetime(self, date_str: str) -> str:
        """格式化日期時間為 ISO8601 格式"""
        # 假設輸入是 "2024-01-15"
        return f"{date_str}T00:00:00Z"

    def export_to_json(self, filepath: str) -> bool:
        """匯出為 JSON 檔案"""
        if not self._converted_data:
            self.convert_orders()

        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(self._converted_data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"匯出失敗: {e}")
            return False


# ============================================================
# 第四部分：執行範例
# ============================================================

def display_comparison(old_data: List[Dict], new_data: List[Dict]) -> None:
    """顯示轉換前後的比較"""

    print("\n" + "=" * 80)
    print("📊 資料轉換比較")
    print("=" * 80)

    print("\n【舊系統格式 (XML 解析後的字典)】")
    print("-" * 40)
    for order in old_data[:1]:  # 只顯示第一筆
        print(f"訂單編號: {order['order_no']}")
        print(f"日期: {order['order_date']}")
        print(f"客戶: {order['customer']['name']}")
        print(f"商品: {len(order['items'])} 項")
        print(f"總金額: {order['total_amount']}")
        print(f"狀態: {order['status']}")

    print("\n【新系統格式 (JSON)】")
    print("-" * 40)
    if new_data:
        order = new_data[0]
        print(f"orderId: {order['orderId']}")
        print(f"createdAt: {order['createdAt']}")
        print(f"customer: {order['customer']}")
        print(f"lineItems: {len(order['lineItems'])} 項")
        print(f"totalPrice: {order['totalPrice']}")
        print(f"orderStatus: {order['orderStatus']}")

    print()


def display_json_output(data: List[Dict]) -> None:
    """顯示 JSON 輸出格式"""

    print("\n【JSON 輸出範例】")
    print("-" * 40)
    print(json.dumps(data[0], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    print("=" * 80)
    print("Adapter Pattern - 舊系統資料遷移範例")
    print("=" * 80)

    # 建立舊系統讀取器 (不可修改)
    legacy_reader = LegacyXMLReader()

    # 建立轉接器
    adapter = LegacyToJsonAdapter(legacy_reader)

    # 執行轉換
    old_data = legacy_reader.parse_xml(legacy_reader.get_orders_as_xml())
    new_data = adapter.convert_orders()

    # 顯示轉換結果
    display_comparison(old_data, new_data)
    display_json_output(new_data)

    # 匯出 JSON
    success = adapter.export_to_json("converted_orders.json")
    if success:
        print("\n✅ 已成功匯出至 converted_orders.json")

    print("\n🎯 重點說明：")
    print("1. 舊系統完全不需要修改")
    print("2. Adapter 負責處理格式轉換")
    print("3. 新系統只需要知道 DataConverter 介面")
    print("4. 未來如有其他舊格式，只需新增對應的 Adapter")
    print("=" * 80)