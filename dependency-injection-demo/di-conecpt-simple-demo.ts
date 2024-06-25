/**
 * Dependency Injection (DI)
 *  - 使用 decorator
 *  - 使用 container
 *  - 
 * 
 */
{

  /** case 2: using a decortator to inject the dependency. */

  // define the service.
  class LoggerService {
    log(message: string) {
      console.log(`LoggerService: ${message}`);      
    }
  }

  // define the consumer.
  function Injectable(target: any) {
    // Placeholder for the Injectable decorator
  }

  /**
   * 如果要使用 decorator, 需要新增 tsconfig.json: emitDecoratorMetadata, 才可以正常執行。
   */
  @Injectable
  class AppService {
    constructor(
      private logger: LoggerService,
    ) {}

    doSomething() {
      this.logger.log('case 2: AppService is doing something.');
    }
  }

  /**
   * create a simple DI container.
   *  - this container will handle the creation and injection of dependencies.
   */

  class DIContainer {
    private static service: Map<string, any> = new Map();

    static register(serviceName: string, instance: any) {
      this.service.set(serviceName, instance);
    }

    static resolve<T>(serviceName: string): T {
      return this.service.get(serviceName);
    }
  }

  /**
   * register services in the DI container.
   */
  // register service.
  DIContainer.register('LoggerService', new LoggerService());
  DIContainer.register('AppService', new AppService(DIContainer.resolve('LoggerService')));

  // resolve and use the AppService
  const appService = DIContainer.resolve<AppService>('AppService');
  appService.doSomething(); // LoggerService: case 2: AppService is doing something.
  
}


{
  /**
   * case 1: 如果不使用decorator or container方式進行DI, 傳統作法為:
   */

  class LoggerService {
    log(message: string) {
      console.log(`LoggerService: ${message}`);      
    }
  }

  function Injectable(target: any) {
    // Placeholder for the Injectable decorator
  }

  class AppService {
    constructor(
      private logger: LoggerService = new LoggerService()
    ) {}

    doSomething() {
      this.logger.log('case 1: AppService is doing something.');
    }
  }

  const LoggerService2 = new LoggerService()
  const AppService2 = new AppService(LoggerService2);
  AppService2.doSomething(); // LoggerService: case 1: AppService is doing something.
}

