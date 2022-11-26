/**
 * Command design pattern
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/command/typescript/example
 */

{
    interface Command {
        execute(): void;
    }
    
    // commands can implement simple operations on their own.
    class SimpleCommand implements Command {
        private _payload: string;
    
        constructor(payload: string) {
            this._payload = payload;
        }
    
        execute(): void {
            console.log(`SimpleCommand: See, I can do simple things like printing (${this._payload})`);
        }
    }
    
    
    // commands can delegate more complex operations to other objects, call receivers.
    class ComplexCommand implements Command {
        private _receiver: Receiver;
    
        // content data, required for launching the receiver's methods.
        private _a: string;
        private _b: string;
    
        constructor(receiver: Receiver, a: string, b: string) {
            this._receiver = receiver;
            this._a = a;
            this._b = b;
        }
    
        // Commands can delegate to any methods of a receiver.
        execute(): void {
            console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
            this._receiver.doSomething(this._a);
            this._receiver.doSomethingElse(this._b);
        }
    }
    
    
    class Receiver {
        doSomething(a: string): void {
            console.log(`Receiver: Working on (${a}.)`);
        }
    
        doSomethingElse(b: string): void {
            console.log(`Receiver: Also working on (${b}.)`);
        }
    }
    
    
    class Invoker {
        private onStart: Command;
        private onFinish: Command;
    
        setOnStart(command: Command): void {
            this.onStart = command;
        }
    
        setOnFinish(command: Command): void {
            this.onFinish = command;
        }
    
        doSomethingImportant(): void {
            console.log('Invoker: Does anybody want something done before I begin?');
            if (this.isCommand(this.onStart)) {
                this.onStart.execute();
            }
    
            console.log('Invoker: ...doing something really important...');
            console.log('Invoker: Does anybody want something done after I finish?');
            if (this.isCommand(this.onFinish)) {
                this.onFinish.execute();
            }
        }
    
        isCommand(object): object is Command {
            return object.execute !== undefined;
        }
    }
    
    
    const invoker = new Invoker();
    const receiver = new Receiver();
    
    invoker.setOnStart(new SimpleCommand('Say Hi!'));
    invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));
    
    invoker.doSomethingImportant()
}