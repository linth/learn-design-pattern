/**
 * 案例 2: 配置文件 config with singleton design pattern.
 * 
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