/**
 * adaptor design pattern
 *  - 目標者 -> 適應者
 * 
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/adapter/typescript/example
 */

// 目標者
class Target {
    request(): string {
        return 'Target: The default target\'s behavior.';
    }
}


// 適應者
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}


// 適配器, 轉換器
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    request(): string {
        const result = this.adaptee
            .specificRequest()
            .split('')
            .reverse()
            .join('');
        
        return `Adapter: (TRANSLATED) ${result}`;
    }
}


function clientCode(target: Target) {
    console.log(target.request());    
}

const target = new Target();
clientCode(target);

const adaptee = new Adaptee();
console.log(`Adaptee: ${adaptee.specificRequest()}`);

const adapter = new Adapter(adaptee);
clientCode(adapter);