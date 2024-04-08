/**
 * Global & Local Cache with singleton design pattern.
 * 
 */

{

  class GlobalCache {
    private static instance: GlobalCache | null = null;
    private data: Map<string, any>;

    private constructor() {
      this.data = new Map<string, any>();
    }

    static getInstance(): GlobalCache {
      return this.instance || (this.instance = new GlobalCache());
    }

    setData(key: string, value: any): void {
      this.data.set(key, value);
    }

    getData(key: string): any {
      return this.data.get(key);
    }
  }

  class LocalCache {
    private data: Map<string, any>;

    constructor() {
      this.data = new Map<string, any>();
    }

    setData(key: string, value: any): void {
      this.data.set(key, value);
    }

    getData(key: string): any {
      return this.data.get(key);
    }
  }

  const globalCache = GlobalCache.getInstance();
  globalCache.setData('globalKey', 'Global Data');

  const localCache1 = new LocalCache();
  localCache1.setData("localKey1", "Local Data 1");

  const localCache2 = new LocalCache();
  localCache2.setData("localKey2", "Local Data 2");

  console.log("Global Cache Data:", globalCache.getData("globalKey")); // Global Cache Data: Global Data
  console.log("Local Cache 1 Data:", localCache1.getData("localKey1")); // Local Cache 1 Data: Local Data 1
  console.log("Local Cache 2 Data:", localCache2.getData("localKey2")); // Local Cache 2 Data: Local Data 2
}


{
  class Cache<T> {
    private static instance: Cache<any> | null = null;
    private data: Map<string, T>;

    private constructor() {
      this.data = new Map<string, T>();
    }

    static getInstance<T>(): Cache<T> {
      if (!Cache.instance) {
        Cache.instance = new Cache<T>();
      }
      return Cache.instance as Cache<T>;
    }

    setData(key: string, value: T): void {
      this.data.set(key, value);
    }

    getData(key: string): T | undefined {
      return this.data.get(key);
    }
  }

  const globalCache = Cache.getInstance<string>();
  globalCache.setData('globalKey', 'Global Data');

  const localCache1 = Cache.getInstance<string>();
  localCache1.setData("localKey1", "Local Data 1");

  const localCache2 = Cache.getInstance<number>();
  localCache2.setData("localKey2", 123);

  console.log("Global Cache Data:", globalCache.getData("globalKey")); // Global Cache Data: Global Data
  console.log("Local Cache 1 Data:", localCache1.getData("localKey1")); // Local Cache 1 Data: Local Data 1
  console.log("Local Cache 2 Data:", localCache2.getData("localKey2")); // Local Cache 2 Data: 123
}