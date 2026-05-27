'''
QuerySet — 查詢結果的鏈式操作封裝
在 QueryBuilder 建立查詢後，將結果包裹為 QuerySet，
可繼續進行過濾、搜尋、統計、分頁等操作。
'''
from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Generic, Iterator, TypeVar

T = TypeVar('T')


@dataclass
class PaginatedResult(Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int

    @property
    def has_prev(self) -> bool:
        return self.page > 1

    @property
    def has_next(self) -> bool:
        return self.page < self.total_pages


class QuerySet(Generic[T]):
    '''
    QuerySet 包裹查詢結果，提供鏈式操作與終端操作。

    鏈式操作（回傳新的 QuerySet）：
    - filter()    — 對結果再做條件過濾
    - exclude()   — 排除符合條件的資料
    - search()    — 對指定欄位進行關鍵字搜尋

    終端操作（回傳值）：
    - to_list()   — 取得結果列表
    - first()     — 取得第一筆
    - count()     — 取得筆數
    - aggregate() — 統計（總和、平均、最大、最小）
    - paginate()  — 分頁
    '''

    def __init__(self, data: list[T]):
        self._data: list[T] = list(data)

    # ==================== 鏈式操作 ====================

    def filter(self, predicate: Callable[[T], bool]) -> QuerySet[T]:
        return QuerySet([item for item in self._data if predicate(item)])

    def exclude(self, predicate: Callable[[T], bool]) -> QuerySet[T]:
        return QuerySet([item for item in self._data if not predicate(item)])

    def search(self, **kwargs: str) -> QuerySet[T]:
        def _matches(item: T) -> bool:
            for field, keyword in kwargs.items():
                value = getattr(item, field, None)
                if value is None or keyword.lower() not in str(value).lower():
                    return False
            return True
        return QuerySet([item for item in self._data if _matches(item)])

    # ==================== 終端操作 ====================

    def to_list(self) -> list[T]:
        return list(self._data)

    def first(self) -> T | None:
        return self._data[0] if self._data else None

    def count(self) -> int:
        return len(self._data)

    def aggregate(self, field: str) -> dict[str, float | None]:
        values = [getattr(item, field, 0) or 0 for item in self._data]
        if not values:
            return {'sum': 0, 'avg': None, 'max': None, 'min': None}
        return {
            'sum': sum(values),
            'avg': sum(values) / len(values),
            'max': max(values),
            'min': min(values),
        }

    def paginate(self, page: int = 1, page_size: int = 20) -> PaginatedResult[T]:
        total = len(self._data)
        total_pages = max(1, (total + page_size - 1) // page_size)
        start = (page - 1) * page_size
        end = start + page_size
        return PaginatedResult(
            items=self._data[start:end],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def __iter__(self) -> Iterator[T]:
        return iter(self._data)

    def __len__(self) -> int:
        return len(self._data)

    def __getitem__(self, index: int) -> T:
        return self._data[index]


# ============================================================
# 使用範例
# ============================================================

@dataclass
class Product:
    id: int
    name: str
    category: str
    price: float
    in_stock: bool

if __name__ == '__main__':
    products = [
        Product(1, 'iPhone 15', '手機', 36000, True),
        Product(2, 'Galaxy S24', '手機', 28000, True),
        Product(3, 'MacBook Air', '筆電', 32000, False),
        Product(4, 'Android 平板', '平板', 12000, True),
        Product(5, 'iPad Pro', '平板', 35000, True),
        Product(6, 'AirPods', '配件', 6000, True),
        Product(7, '機械鍵盤', '配件', 4500, False),
        Product(8, 'Galaxy Tab', '平板', 15000, True),
    ]

    qs = QuerySet(products)

    print('=== 情境一：過濾 + 統計 ===')
    result = (
        qs
        .filter(lambda p: p.in_stock)
        .filter(lambda p: p.price >= 10000)
        .search(name='Galaxy')
    )
    print(f'符合條件的商品: {[p.name for p in result]}')
    print(f'筆數: {result.count()}')
    print(f'價格統計: {result.aggregate("price")}')

    print('\n=== 情境二：分頁 ===')
    page = qs.paginate(page=1, page_size=3)
    print(f'第 {page.page}/{page.total_pages} 頁（共 {page.total} 筆）:')
    for p in page.items:
        print(f'  - {p.name} (${p.price})')

    print('\n=== 情境三：排除 + 搜尋 ===')
    result2 = (
        qs
        .exclude(lambda p: not p.in_stock)
        .search(category='平板')
    )
    print(f'有庫存的平板: {[p.name for p in result2]}')

    print('\n=== 情境四：first() ===')
    first = qs.filter(lambda p: p.price > 30000).first()
    print(f'價格超過 30000 的第一筆: {first.name if first else "無"}')
