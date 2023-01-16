/**
 * abstract factory design pattern.
 *  - 三層架構: interface, abstract, concrete class.
 *  - concreteFactory class 含
 * 
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/blob/main/abstract_factory/abstractFactory.ts
 */

namespace AbstractFactoryPattern {
  export interface AbstractProductA {
    methodA(): string;
  }

  export interface AbstractProductB {
    methodB(): number;
  }

  export interface AbstractFactory {
    createProductA(param?: any): AbstractProductA;
    createProductB(): AbstractProductB;
  }


  export class ProductA1 implements AbstractProductA {
    methodA(): string {
      return 'this is methodA of ProductA1.';
    }
  }

  export class ProductB1 implements AbstractProductB {
    methodB(): number {
      return 1;
    }
  }

  export class ProductA2 implements AbstractProductA {
    methodA(): string {
      return 'this is methodA of ProductA2';
    }
  }

  export class ProductB2 implements AbstractProductB {
    methodB(): number {
      return 2;
    }
  }

  export class ConcreteFactory1 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
      return new ProductA1();
    }

    createProductB(): AbstractProductB {
      return new ProductB1();
    }
  }

  export class ConcreteFactory2 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
      return new ProductA2();
    }

    createProductB(): AbstractProductB {
      return new ProductB2();
    }
  }


  export class Tester {
    private abstractProductA: AbstractProductA;
    private abstractProductB: AbstractProductB;

    constructor(factory: AbstractFactory) {
      this.abstractProductA = factory.createProductA();
      this.abstractProductB = factory.createProductB();
    }

    test(): void {
      console.log(this.abstractProductA.methodA());
      console.log(this.abstractProductB.methodB());
    }
  }
}

