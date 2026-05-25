'''
Specification Pattern（規格模式）
透過組合多個商務規則（Specification），以 AND、OR、NOT 等邏輯運算靈活組裝篩選條件。
核心概念是將每個判斷邏輯封裝成獨立的類別，並可任意組合。
'''

from abc import ABC, abstractmethod
from dataclasses import dataclass


# ---------- 領域模型 ----------

@dataclass
class Product:
    '''商品領域模型'''
    id: int
    title: str
    price: float
    category: str
    in_stock: bool
    rating: float


# ---------- 抽象規格 ----------

class Specification(ABC):
    '''抽象規格基底類別，所有具體規格與組合規格都繼承此類'''

    @abstractmethod
    def is_satisfied_by(self, item: Product) -> bool:
        '''判斷給定的商品是否滿足此規格'''

    def __and__(self, other: 'Specification') -> 'AndSpecification':
        '''使用 & 運算子組合 AND 條件'''
        return AndSpecification(self, other)

    def __or__(self, other: 'Specification') -> 'OrSpecification':
        '''使用 | 運算子組合 OR 條件'''
        return OrSpecification(self, other)

    def __invert__(self) -> 'NotSpecification':
        '''使用 ~ 運算子反轉條件'''
        return NotSpecification(self)


# ---------- 組合規格（Composite Specifications）----------

class AndSpecification(Specification):
    '''AND 組合規格：兩個規格都必須滿足'''

    def __init__(self, left: Specification, right: Specification):
        self._left = left
        self._right = right

    def is_satisfied_by(self, item: Product) -> bool:
        return self._left.is_satisfied_by(item) and self._right.is_satisfied_by(item)


class OrSpecification(Specification):
    '''OR 組合規格：滿足其中一個規格即可'''

    def __init__(self, left: Specification, left2: Specification):
        self._left = left
        self._right = left2

    def is_satisfied_by(self, item: Product) -> bool:
        return self._left.is_satisfied_by(item) or self._right.is_satisfied_by(item)


class NotSpecification(Specification):
    '''NOT 組合規格：反轉規格結果'''

    def __init__(self, spec: Specification):
        self._spec = spec

    def is_satisfied_by(self, item: Product) -> bool:
        return not self._spec.is_satisfied_by(item)


# ---------- 具體規格（Concrete Specifications）----------

class PriceSpecification(Specification):
    '''價格規格：篩選價格在指定範圍內的商品'''

    def __init__(self, min_price: float | None = None, max_price: float | None = None):
        self._min = min_price
        self._max = max_price

    def is_satisfied_by(self, item: Product) -> bool:
        if self._min is not None and item.price < self._min:
            return False
        if self._max is not None and item.price > self._max:
            return False
        return True


class CategorySpecification(Specification):
    '''分類規格：篩選指定分類的商品'''

    def __init__(self, category: str):
        self._category = category

    def is_satisfied_by(self, item: Product) -> bool:
        return item.category == self._category


class InStockSpecification(Specification):
    '''庫存規格：僅篩選有庫存的商品'''

    def is_satisfied_by(self, item: Product) -> bool:
        return item.in_stock


class RatingSpecification(Specification):
    '''評分規格：篩選評分不低於門檻值的商品'''

    def __init__(self, min_rating: float):
        self._min_rating = min_rating

    def is_satisfied_by(self, item: Product) -> bool:
        return item.rating >= self._min_rating


# ---------- 過濾器 ----------

class ProductFilter:
    '''使用 Specification 對商品清單進行過濾'''

    @staticmethod
    def filter_by_spec(products: list[Product], spec: Specification) -> list[Product]:
        return [p for p in products if spec.is_satisfied_by(p)]


# ============================================================
# 使用範例
# ============================================================
if __name__ == '__main__':
    # 準備測試商品資料
    products = [
        Product(1, 'iPhone 15', 36000, '手機', True, 4.8),
        Product(2, 'Galaxy S24', 28000, '手機', True, 4.5),
        Product(3, 'MacBook Air', 32000, '筆電', False, 4.7),
        Product(4, 'Android 平板', 12000, '平板', True, 4.0),
        Product(5, 'iPad Pro', 35000, '平板', True, 4.9),
        Product(6, '低價耳機', 500, '配件', True, 3.2),
    ]

    # 情境一：篩選手機分類且價格在 25000~40000 之間的商品
    spec1 = CategorySpecification('手機') & PriceSpecification(25000, 40000)
    result1 = ProductFilter.filter_by_spec(products, spec1)
    print('情境一 (手機 + 價格區間):')
    for p in result1:
        print(f'  - {p.title} (${p.price})')
    print()

    # 情境二：篩選有庫存且評分 >= 4.5 的高評價商品
    spec2 = InStockSpecification() & RatingSpecification(4.5)
    result2 = ProductFilter.filter_by_spec(products, spec2)
    print('情境二 (有庫存 + 高評分):')
    for p in result2:
        print(f'  - {p.title} (庫存: {p.in_stock}, 評分: {p.rating})')
    print()

    # 情境三：不屬於配件分類且價格 >= 10000 的商品（NOT + AND 組合）
    spec3 = ~CategorySpecification('配件') & PriceSpecification(min_price=10000)
    result3 = ProductFilter.filter_by_spec(products, spec3)
    print('情境三 (非配件 + 價格 >= 10000):')
    for p in result3:
        print(f'  - {p.title} ({p.category}, ${p.price})')
