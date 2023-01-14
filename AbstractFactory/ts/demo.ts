/**
 * abstract factory design pattern.
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/blob/main/abstract_factory/demo.ts
 */

namespace AbstractFactoryPattern {

  // TODO: need to check and fix the exported issue.
  export function show() {
    var factory1: AbstractFactoryPattern.AbstractFactory = new AbstractFactoryPattern.ConcreteFactory1();
    var factory2: AbstractFactoryPattern.AbstractFactory = new AbstractFactoryPattern.ConcreteFactory2();
    
    // for test.
    var tester1: AbstractFactoryPattern.Tester = new AbstractFactoryPattern.Tester(factory1);
    var tester2: AbstractFactoryPattern.Tester = new AbstractFactoryPattern.Tester(factory2);

    tester1.test();
    tester2.test();
  }
}

{
  console.log('hello world.');
  
  // var a = new AbstractFactoryPattern.ConcreteFactory1();
  // a.createProductB();
  // AbstractFactoryPattern.show();
}