/**
 * Singleton 實際案例
 *  - 案例 1: 日誌紀錄器: 日誌記錄器是一種常見的應用程式組件，它用於記錄應用程式執行中的事件。日誌記錄器需要能夠在應用程式中的所有部分訪問，因此它通常實現了單例模式。
 *    => 請參考 logger-ex.ts
 * 
 *  - 案例 2: 配置文件: 配置文件是一種存儲應用程式配置信息的文件。配置文件通常需要能夠在應用程式中的所有部分訪問，因此它通常實現了單例模式。
 *    => 請參考 config-ex.ts
 * 
 *  - 案例 3: 數據庫連接池
 *  - 案例 4: 暫存
 * 
 */

class Singleton {
  private static _instance: Singleton | null = null;
  private constructor() {}

  public static getInstance(): Singleton {
    if (Singleton._instance === null) {
      Singleton._instance = new Singleton();
    }
    return Singleton._instance;
  }
}

{
  const singleton = Singleton.getInstance();
  console.log(singleton); // Singleton {}
}


// 案例 3：數據庫連接池
{
  class DatabaseConnectionPool {
    private static _instance: DatabaseConnectionPool | null = null;
  
    private constructor(private readonly _connectionString: string) {}
  
    public static getInstance(connectionString: string): DatabaseConnectionPool {
      if (DatabaseConnectionPool._instance === null) {
        DatabaseConnectionPool._instance = new DatabaseConnectionPool(connectionString);
      }
  
      return DatabaseConnectionPool._instance;
    }
  
    // public getConnection(): Promise<Connection> {
    //   return new Promise<Connection>((resolve, reject) => {
    //     try {
    //       const connection = new Connection(this._connectionString);
    //       resolve(connection);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });
    // }
  
    // public close(): void {
    //   this._connection.close();
    // }
  }

  {
    // const pool = DatabaseConnectionPool.getInstance("your_connection_string");
    // const connection = await pool.getConnection();
  }
}


// 案例 4： 暫存
{
  class Cache {
    private static _instance: Cache | null = null;
    private constructor() {}
  
    public static getInstance(): Cache {
      if (Cache._instance === null) {
        Cache._instance = new Cache();
      }
  
      return Cache._instance;
    }
  
    public set(key: string, value: any): void {
      this._cache[key] = value;
    }
  
    public get(key: string): any {
      return this._cache[key];
    }
  
    private _cache: { [key: string]: any } = {};
  }

  {
    const cache = Cache.getInstance();
    cache.set("key", "value");
    const value = cache.get("key");
  }
}
