/**
 * factory method
 *  - 三層設計: interface, abstract, concrete class.
 *  - 最後一個 function: 使用 if/else 方式來處理 new 哪個 object
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/blob/main/factory_method/factoryMethod.ts
 */

namespace FactoryMethodPattern {

  export interface AbstractProduct {
    method(param?: any): void;
  }

  export class ConcreteProductA implements AbstractProduct {
    method = (param?: any) => {
      return 'Method of concreteProductA';
    }
  }

  export class ConcreteProductB implements AbstractProduct {
    method = (param?: any) => {
      return 'Method of concreteProductB';
    }
  }

  export namespace ProductFactory {
    export function createProduct(type: string): AbstractProduct {
      if (type === 'A') {
        return new ConcreteProductA();
      } else if (type === 'B') {
        return new ConcreteProductB();
      } else {
        return new ConcreteProductB();
      }
      // return null; // TODO: 無法使用 null, 需要想其他方法。
    }
  }
}


{
  // example.
  var a: FactoryMethodPattern.AbstractProduct = FactoryMethodPattern.ProductFactory.createProduct("A");
	var b: FactoryMethodPattern.AbstractProduct = FactoryMethodPattern.ProductFactory.createProduct("B");

  console.log(a.method()); // Method of concreteProductA
  console.log(b.method()); // Method of concreteProductB
}