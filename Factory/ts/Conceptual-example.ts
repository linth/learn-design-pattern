/**
 * Factory design pattern with typescript.
 *  - [Product] 1 interface, several concrete classes 
 *  - [Creator] 1 abstract class, several concrete classes
 *  - [function] 1 function with argument: creator class.
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/factory-method/typescript/example
 */


interface Product {
    operation(): string;
}

class ConcreteProduct1 implements Product {
    operation(): string {
        return 'Result: concrete product 1.';
    }
}

class ConcreteProduct2 implements Product {
    operation(): string {
        return 'Result: concrete product 2.';
    }
}


// creator abstract class.
abstract class Creator {    
    abstract factorMethod(): Product;
    someOperation(): string {
        const product = this.factorMethod();
        return 'creator: call someOperation function.';
    }
}

class ConcreteCreator1 extends Creator {
    factorMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    factorMethod(): Product {
        return new ConcreteProduct2();
    }
}


/**
 * client code 
 */
function clientCode(creator: Creator) {
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
}


/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */ 
console.log('建立 concreteCreator 1.');
clientCode(new ConcreteCreator1());
console.log('');

 
console.log('建立 concreteCreator 2.');
clientCode(new ConcreteCreator2());