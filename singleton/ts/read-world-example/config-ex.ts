/**
 * 獨體模式 - 設定檔管理真實案例
 * 應用程式設定應全域一致，使用 Singleton 集中管理。
 */

{
  /** 基本設定管理（簡單版） */
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

  const devConfig = Config.getInstance();
  devConfig.set('host', 'localhost');
  devConfig.set('env', 'dev');

  // 任何地方取得都是同一個實例
  const prodConfig = Config.getInstance();
  prodConfig.set('host', 'production.example.com');
  prodConfig.set('env', 'production');

  console.log(`dev host: ${devConfig.get('host')}`); // production (被覆蓋)
  console.log(`dev env: ${devConfig.get('env')}`); // production

  // 注意：因 devConfig 與 prodConfig 是同一實例，
  // dev 的設定被 prod 覆蓋了，這是 Singleton 的特性需要注意！
}

/**
 * 進階版設定管理（避免上述問題）
 */
{
  class ConfigManager {
    private static instance: ConfigManager;
    private config: Record<string, any>;

    private constructor() {
      // 模擬從檔案載入初始設定
      this.config = {
        appVersion: '1.0.0',
        server: { host: '0.0.0.0', port: 3000 },
        database: {
          host: 'localhost',
          port: 5432,
          user: 'admin',
          password: 'secret',
          name: 'mydb',
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

    public set(key: string, value: any): void {
      this.config[key] = value;
    }

    public getAll(): Record<string, any> {
      return this.config;
    }
  }

  const config = ConfigManager.getInstance();
  console.log('版本:', config.get('appVersion'));
  console.log('資料庫主機:', config.get('database').host);
}
