'''
Fluent Query Builder 設計模式
透過方法鏈（Method Chaining）以流暢的介面逐步建立查詢，
每個方法都回傳 self，讓開發者可以串接多個操作。
'''

class QueryBuilder:
    '''通用的 Fluent Query Builder，支援 SELECT、FROM、WHERE、ORDER BY、LIMIT 等子句。'''

    def __init__(self):
        # 儲存選取欄位，若無則使用 "*"
        self._columns: list[str] = []
        # 資料表名稱
        self._table: str = ''
        # WHERE 條件清單，每個元素為 (欄位, 運算子, 值, 連接詞)
        self._where_clauses: list[tuple[str, str, object, str]] = []
        # 排序條件清單，每個元素為 (欄位, 是否降冪)
        self._order_by_clauses: list[tuple[str, bool]] = []
        # LIMIT 筆數
        self._limit: int | None = None
        # OFFSET 跳過筆數
        self._offset: int | None = None

    def select(self, *columns: str) -> 'QueryBuilder':
        '''指定要查詢的欄位，例如 .select("id", "name", "email")'''
        self._columns.extend(columns)
        return self

    def from_table(self, table: str) -> 'QueryBuilder':
        '''指定查詢的資料表名稱'''
        self._table = table
        return self

    def where(self, column: str, operator: str, value: object) -> 'QueryBuilder':
        '''加入 WHERE 條件（預設使用 AND 連接）'''
        connector = 'AND' if self._where_clauses else ''
        self._where_clauses.append((column, operator, value, connector))
        return self

    def and_where(self, column: str, operator: str, value: object) -> 'QueryBuilder':
        '''加入 AND 條件'''
        self._where_clauses.append((column, operator, value, 'AND'))
        return self

    def or_where(self, column: str, operator: str, value: object) -> 'QueryBuilder':
        '''加入 OR 條件'''
        self._where_clauses.append((column, operator, value, 'OR'))
        return self

    def order_by(self, column: str, descending: bool = False) -> 'QueryBuilder':
        '''加入排序條件，descending=True 表示降冪'''
        self._order_by_clauses.append((column, descending))
        return self

    def limit(self, limit: int) -> 'QueryBuilder':
        '''限制回傳筆數'''
        self._limit = limit
        return self

    def offset(self, offset: int) -> 'QueryBuilder':
        '''跳過指定筆數（用於分頁）'''
        self._offset = offset
        return self

    def build(self) -> str:
        '''建構最終的 SQL 查詢字串'''
        # SELECT 子句
        columns_part = ', '.join(self._columns) if self._columns else '*'

        # FROM 子句
        if not self._table:
            raise ValueError('必須指定資料表名稱（from_table）')
        sql = f'SELECT {columns_part} FROM {self._table}'

        # WHERE 子句
        if self._where_clauses:
            where_parts: list[str] = []
            for i, (col, op, val, conn) in enumerate(self._where_clauses):
                # 將值格式化為字串
                formatted_val = f"'{val}'" if isinstance(val, str) else str(val)
                if i == 0:
                    where_parts.append(f'{col} {op} {formatted_val}')
                else:
                    where_parts.append(f'{conn} {col} {op} {formatted_val}')
            sql += ' WHERE ' + ' '.join(where_parts)

        # ORDER BY 子句
        if self._order_by_clauses:
            order_parts = [
                f'{col} DESC' if desc else col
                for col, desc in self._order_by_clauses
            ]
            sql += ' ORDER BY ' + ', '.join(order_parts)

        # LIMIT 子句
        if self._limit is not None:
            sql += f' LIMIT {self._limit}'

        # OFFSET 子句
        if self._offset is not None:
            sql += f' OFFSET {self._offset}'

        return sql


# ============================================================
# 使用範例
# ============================================================
if __name__ == '__main__':
    # 情境一：基本查詢 + 條件過濾
    q1 = QueryBuilder() \
        .select('id', 'name', 'email') \
        .from_table('users') \
        .where('status', '=', 'active') \
        .build()
    print(f'情境一 (基本查詢):\n  {q1}\n')

    # 情境二：複雜查詢 + 排序 + 分頁
    q2 = QueryBuilder() \
        .select('id', 'title', 'price') \
        .from_table('products') \
        .where('price', '>', 100) \
        .and_where('category', '=', 'electronics') \
        .order_by('price', descending=True) \
        .limit(20) \
        .offset(0) \
        .build()
    print(f'情境二 (排序分頁):\n  {q2}\n')

    # 情境三：多條件 OR + AND 混合查詢
    q3 = QueryBuilder() \
        .select('order_id', 'amount', 'status') \
        .from_table('orders') \
        .where('status', '=', 'pending') \
        .or_where('priority', '=', 'high') \
        .and_where('amount', '>=', 5000) \
        .order_by('amount', descending=True) \
        .build()
    print(f'情境三 (混合條件):\n  {q3}')
