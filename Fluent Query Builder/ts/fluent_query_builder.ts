/**
 * Fluent Query Builder 設計模式
 * 透過方法鏈（Method Chaining）以流暢的介面逐步建立查詢，
 * 每個方法都回傳 this，讓開發者可以串接多個操作。
 */

// WHERE 條件介面
interface WhereClause {
  column: string;
  operator: string;
  value: unknown;
  connector: string; // AND, OR, 或首個條件為空
}

// ORDER BY 排序介面
interface OrderByClause {
  column: string;
  descending: boolean;
}

// 查詢結果介面
interface QueryResult {
  sql: string;
  parameters: Record<string, unknown>;
}

/**
 * Fluent SQL 查詢建構器
 * 支援鏈式呼叫逐步組裝 SELECT 查詢
 */
class FluentQueryBuilder {
  // 選取欄位清單
  private columns: string[] = [];
  // 資料表名稱
  private table: string = '';
  // WHERE 條件清單
  private whereClauses: WhereClause[] = [];
  // ORDER BY 排序清單
  private orderByClauses: OrderByClause[] = [];
  // 參數字典
  private parameters: Record<string, unknown> = {};
  // LIMIT 筆數
  private limitValue: number | null = null;
  // OFFSET 跳過筆數
  private offsetValue: number | null = null;

  /** 指定查詢欄位，例如 .select("id", "name", "email") */
  select(...columns: string[]): this {
    this.columns.push(...columns);
    return this;
  }

  /** 指定查詢的資料表 */
  from(table: string): this {
    this.table = table;
    return this;
  }

  /** 加入 WHERE 條件（第一個條件無連接詞，後續預設 AND） */
  where(column: string, operator: string, value: unknown): this {
    this.whereClauses.push({
      column,
      operator,
      value,
      connector: this.whereClauses.length > 0 ? 'AND' : '',
    });
    this.addParameter(column, value);
    return this;
  }

  /** 加入 AND 連接的 WHERE 條件 */
  andWhere(column: string, operator: string, value: unknown): this {
    this.whereClauses.push({ column, operator, value, connector: 'AND' });
    this.addParameter(column, value);
    return this;
  }

  /** 加入 OR 連接的 WHERE 條件 */
  orWhere(column: string, operator: string, value: unknown): this {
    this.whereClauses.push({ column, operator, value, connector: 'OR' });
    this.addParameter(column, value);
    return this;
  }

  /** 加入排序條件，descending = true 表示降冪排序 */
  orderBy(column: string, descending: boolean = false): this {
    this.orderByClauses.push({ column, descending });
    return this;
  }

  /** 限制回傳筆數 */
  limit(limit: number): this {
    this.limitValue = limit;
    return this;
  }

  /** 跳過指定筆數（用於分頁） */
  offset(offset: number): this {
    this.offsetValue = offset;
    return this;
  }

  /** 建構最終的 SQL 查詢字串與參數 */
  build(): QueryResult {
    // SELECT 子句
    const columnsPart = this.columns.length > 0 ? this.columns.join(', ') : '*';

    // FROM 子句
    if (!this.table) {
      throw new Error('必須指定資料表名稱（from）');
    }
    const parts: string[] = [`SELECT ${columnsPart} FROM ${this.table}`];

    // WHERE 子句
    if (this.whereClauses.length > 0) {
      const whereParts: string[] = [];
      for (let i = 0; i < this.whereClauses.length; i++) {
        const wc = this.whereClauses[i];
        const paramRef = `@${wc.column}_${i}`;
        if (i === 0) {
          whereParts.push(`${wc.column} ${wc.operator} ${paramRef}`);
        } else {
          whereParts.push(`${wc.connector} ${wc.column} ${wc.operator} ${paramRef}`);
        }
      }
      parts.push('WHERE ' + whereParts.join(' '));
    }

    // ORDER BY 子句
    if (this.orderByClauses.length > 0) {
      const orderParts = this.orderByClauses.map((ob) =>
        ob.descending ? `${ob.column} DESC` : ob.column,
      );
      parts.push('ORDER BY ' + orderParts.join(', '));
    }

    // LIMIT 子句
    if (this.limitValue !== null) {
      parts.push(`LIMIT ${this.limitValue}`);
    }

    // OFFSET 子句
    if (this.offsetValue !== null) {
      parts.push(`OFFSET ${this.offsetValue}`);
    }

    return {
      sql: parts.join(' '),
      parameters: this.parameters,
    };
  }

  /** 將參數值加入參數字典 */
  private addParameter(column: string, value: unknown): void {
    if (value !== undefined && value !== null) {
      const paramName = `@${column}_${Object.keys(this.parameters).length}`;
      this.parameters[paramName] = value;
    }
  }

  /** 靜態工廠方法：快速建立從指定資料表查詢的 Builder */
  static selectFrom(table: string): FluentQueryBuilder {
    return new FluentQueryBuilder().from(table);
  }
}

// ============================================================
// 使用範例
// ============================================================

// 情境一：基本查詢 + 條件過濾
const q1 = FluentQueryBuilder.selectFrom('users')
  .select('id', 'name', 'email')
  .where('status', '=', 'active')
  .build();
console.log(`情境一 (基本查詢):\n  ${q1.sql}\n`);

// 情境二：複雜查詢 + 排序 + 分頁
const q2 = FluentQueryBuilder.selectFrom('products')
  .select('id', 'title', 'price')
  .where('price', '>', 100)
  .andWhere('category', '=', 'electronics')
  .orderBy('price', true)
  .limit(20)
  .offset(0)
  .build();
console.log(`情境二 (排序分頁):\n  ${q2.sql}\n`);

// 情境三：多條件 OR + AND 混合查詢
const q3 = FluentQueryBuilder.selectFrom('orders')
  .select('order_id', 'amount', 'status')
  .where('status', '=', 'pending')
  .orWhere('priority', '=', 'high')
  .andWhere('amount', '>=', 5000)
  .orderBy('amount', true)
  .build();
console.log(`情境三 (混合條件):\n  ${q3.sql}`);
