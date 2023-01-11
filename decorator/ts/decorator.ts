/**
 * decorator design pattern
 *  - interface class: Component
 *  - class: Decorator
 *  - concrete class: ConcreteComponent, ConcreteDecorator
 * 
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/tree/main/decorator
 */

namespace DecoratorPattern {
  
  export interface Component {
    // interface class component.
    operation(): void;
  }

  export class ConcreteComponent implements Component {
    // concrete class of component.
    private s: string;

    constructor(s: string) {
      this.s = s;
    }

    public operation(): void {
      console.log(`operation of concreteComponent, ${this.s} is being called!`);      
    }
  }

  export class Decorator implements Component {
    // decorator.
    private component: Component;
    private id: number;

    constructor(id: number, conponent: Component) {
      this.id = id;
      this.component = conponent;
    }

    public get Id(): number {
      return this.id;
    }

    public operation(): void {
      console.log(`operation of Decorator ${this.id} is being called!`);
      this.component.operation();
    }
  }

  export class ConcreteDecorator extends Decorator {
    // concrete class of decorator.
    constructor(id: number, component: Component) {
      super(id, component);
    }

    public operation(): void {
      super.operation();
      console.log(`operation of ConcreteDecorator ${this.Id} is being called!`);      
    }
  }
}



