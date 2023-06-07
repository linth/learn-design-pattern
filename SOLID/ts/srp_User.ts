/**
 * Single Responsibility Principle (SRP) for User
 *  - User class: Manages only stuffs related directly to user data (edit name and age)
 *  - UserLogProxy: Manage only the logs of user actions
 * 
 * 
 * Reference:
 *  - https://medium.com/front-end-weekly/s-o-l-i-d-principles-with-js-examples-db95b44e82e
 */

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
    this.addLog('Edited user name');
  }

  setAge(age: number) {
    this.age = age;
    this.addLog('Edited user age');
  }
}


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
        proxyScope.addLog(`Edited user ${propKey.replace('set', '')}`);
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