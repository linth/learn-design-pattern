/**
 * Proxy design pattern for simple.
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/proxy/typescript/example
 */

{
  interface Subject {
    request(): void;
  }

  // RealSubject class 提供相關的function
  class RealSubject implements Subject {
    request(): void {
      console.log('RealSubject: Handling request.');
    }
  }

  // 使用proxy來對subject下的繼承的class進行行為控管
  class Proxy implements Subject {
    private realSubject: RealSubject;

    constructor(realSubject: RealSubject) {
      this.realSubject = realSubject;
    }

    public request(): void {
      if (this.checkAccess()) {
        this.realSubject.request();
        this.logAccess();
      }
    }

    private checkAccess(): boolean {
      console.log('Proxy: Checking access prior to firing a real request.');
      return true;
    }

    private logAccess(): void {
      console.log('Proxy: Logging the time of request.');
    }
  }

  // 此class只是當作call function腳色
  function clientCode(subject: Subject) {
    subject.request();
  }

  console.log('Client: Executing the client code with a real subject:');
  const realSubject = new RealSubject();
  clientCode(realSubject); // RealSubject: Handling request.

  console.log('');

  console.log('Client: Executing the same client code with a proxy:');
  const proxy = new Proxy(realSubject);
  clientCode(proxy);

  /**
   * Proxy: Checking access prior to firing a real request.
   * RealSubject: Handling request.
   * Proxy: Logging the time of request.
   */
}