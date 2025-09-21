/**
 * 案例 2: 配置文件 config with singleton design pattern.
 * 
 */


{
  // 案例 2：配置文件
  class Config {
    private static _instance: Config | null = null;
    private _config: { [key: string]: string } = {};

    private constructor() {}

    static getInstance(): Config {
      return this._instance || (this._instance = new Config());
    }

    get(key: string): string {
      return this._config[key];
    }

    set(key: string, value: string): void {
      this._config[key] = value;
    }
  }

  // dev config.
  const devConfig = Config.getInstance();
  devConfig.set('host', 'localhost');
  devConfig.set('address', 'localhost');
  devConfig.set('account', 'linth');
  devConfig.set('password', '123456');
  devConfig.set('env', 'dev');

  // prod config.
  const prodConfig = Config.getInstance();
  prodConfig.set('host', 'hihi');
  prodConfig.set('address', '81.84.318.118');
  prodConfig.set('account', 'gg');
  prodConfig.set('password', '2222');
  prodConfig.set('env', 'prod');
}



/**
 * Configuration Manager (軟體參數集中管理)
 * 
 * 實際情境
 * 你有一個大型專案，裡面包含：
 *  - 軟體開發版本號 (e.g., 1.0.3)
 *  - API URL (e.g., https://api.myservice.com)
 *  - Server IP + Port (e.g., 192.168.1.100:8080)
 *  - Database (Postgres) 的連線資訊：
 *    - host: 192.168.1.200
 *    - port: 5432
 *    - user: admin
 *    - password: secret123
 *    - database: mydb
 * 
 * 如果每個模組都去讀 .env 或 JSON 設定檔 → 會浪費 IO，而且可能有人誤改/不同步。
 * 👉 解法：建立一個 ConfigManager (Singleton)，啟動時只讀一次設定，其他模組直接取用同一個實例。
 */

{
  class ConfigManager {
    private static instance: ConfigManager;
    private config: Record<string, any>;

    // 實際情況下可從 .env 或 JSON 檔讀取
    private constructor() {
      this.config = {
        appVersion: "1.0.3",
        server: {
          host: "127.0.0.1",
          port: 3000,
        },
        database: {
          host: "192.168.1.200",
          port: 5432,
          user: "admin",
          password: "secret123",
          name: "mydb",
        },
        mqtt: {
          brokerUrl: "mqtt://127.0.0.1:1883",
          username: "mqttUser",
          password: "mqttPass",
        },
      };
    }

    public static getInstance(): ConfigManager {
      if (!ConfigManager.instance) {
        ConfigManager.instance = new ConfigManager();
      }
      return ConfigManager.instance;
    }

    public get(key: string): any {
      return this.config[key];
    }

    public getAll(): Record<string, any> {
      return this.config;
    }
  }

  const config = ConfigManager.getInstance();
  console.log(config.get('appVersion'));
  console.log(config.getAll());
}