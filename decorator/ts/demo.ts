/**
 * (似乎需要調整修改) decorator demo.
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/blob/main/decorator/demo.ts
 */

namespace DecoratorPattern {
  export namespace Demo {
    export function show(): void {
      var decorator1: DecoratorPattern.Decorator = new DecoratorPattern.ConcreteDecorator(1, new DecoratorPattern.ConcreteComponent("Comp1"));
      decorator1.operation();
    }
  }
}

