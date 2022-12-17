/**
 * Command design pattern.
 *  - 老闆指派 to do list 給秘書，將事情交代給秘書，由秘書去叫員工把事情做好即可。
 * 
 * 
 * 1. Command：執行操作的 interface/abstract class。
 * 2. ConcreteCommand：Command的實體物件，通常會持有Receiver，並呼叫 Receiver 的功能來完成命令要執行的操作。
 * 3. Receiver：做事情的人，命令傳遞到被執行。
 * 4. Invoker：接收並要求執行命令。
 * 5. Client：建立 Command Object，組裝 Command Object 和 Receiver
 * 
 * 
 * Reference:
 *  - https://ianjustin39.github.io/ianlife/design-pattern/command-pattern/
 */

{
    // 執行命令的人 (接收者/做事情的人/員工)
    class Receiver {
        action(str: string) {
            console.log(str);            
        }
    }

    // 命令
    abstract class Command {
        receiver: Receiver;

        constructor(receiver: Receiver) {
            this.receiver = receiver;
        }

        abstract execute(): void;
    }

    class ConcreteCommand extends Command {
        constructor(receiver: Receiver) {
            super(receiver);
        }

        execute(): void {
            this.receiver.action('execute task.');
        }
    }

    // 要求執行命令 (秘書)
    class Invoker {
        commandList: Command[] = [];

        setCommand(command: Command): void {
            this.commandList.push(command);
        }

        executeCommand(): void {
            console.log('Invoker call Receiver');

            for (let i=0; i<this.commandList.length; i++) {
                this.commandList[i].execute();
            }
        }
    }

    let receiver = new Receiver(); // define receiver.
    let invoker = new Invoker(); // define invoker.

    let commands = new ConcreteCommand(receiver); // define command to provide invoker.

    console.log('Client call Invoker ...');    
    invoker.setCommand(commands);
    invoker.executeCommand();
}
