/**
 * 單一職責原則 (Single Responsibility Principle, SRP) - User 範例
 *  - User class: 僅負責管理使用者資料（名稱、年齡）
 *  - UserLogProxy: 僅負責記錄使用者操作日誌
 *  將資料管理與日誌記錄分離，符合 SRP。
 *
 * Reference:
 *  - https://medium.com/front-end-weekly/s-o-l-i-d-principles-with-js-examples-db95b44e82e
 */

/** 違反 SRP 的 User 類別：同時管理資料與日誌 */
class User {
  name: string;
  age: number;
  logs: string[];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.logs = [];
  }

  private addLog(log: string) {
    this.logs.push(log);
  }

  getLogs(): string[] {
    return this.logs;
  }

  setName(name: string) {
    this.name = name;
    this.addLog('修改使用者名稱');
  }

  setAge(age: number) {
    this.age = age;
    this.addLog('修改使用者年齡');
  }
}

/** 
 * 遵循 SRP：將日誌記錄職責拆分到獨立類別，
 * 透過 Proxy 攔截 User 的操作來記錄日誌，不汙染 User 本身
 */
class UserLogProxy {
  private logs: string[];
  private target: any;

  constructor(target: any) {
    this.logs = [];
    this.target = target;
  }

  getLogs() {
    return this.logs;
  }

  addLog(message: string) {
    this.logs.push(message);
  }

  get(target: any, propKey: string, receiver: any) {
    const UserLogScope = this;

    if (propKey === 'logs') {
      return {
        get: () => this.getLogs(),
      };
    }

    const targetValue = Reflect.get(target, propKey, receiver);

    if (typeof targetValue === 'function') {
      const proxyScope = this;
      
      return function(...args: any[]) {
        const result = Reflect.apply(targetValue, target, args);
        proxyScope.addLog(`修改使用者 ${propKey.replace('set', '')}`);
        return result;
      };
    }

    return targetValue;
  }
}

{
  const run = () => {
    const UserInstanceWithLogs = new Proxy(
      new User("Ricardo", 32),
      new UserLogProxy(123),
    );
  
    UserInstanceWithLogs.setAge(33);
    UserInstanceWithLogs.setName("Ricardo Luz");
    console.log(UserInstanceWithLogs.logs.get());
  };
  
  run();
}