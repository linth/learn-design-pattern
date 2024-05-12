/**
 * Condition example with command design pattern.
 * 
 * 
 * Reference:
 *  - https://juejin.cn/post/7021183561189294094?searchId=202405121153464177611F2DB5B624FA6A
 */

{
  class ConditionReceiver {
    on(): void {
      console.log('開機');
    }

    off(): void {
      console.log('關機');
    }

    cool(): void {
      console.log('冷氣');
    }

    warn(): void {
      console.log('暖氣');
    }
  }

  /** Command 命令 */
  interface Command {
    execute(): void;
  }

  abstract class AbsCommand implements Command {
    conditionReceiver: ConditionReceiver;

    constructor(cr: ConditionReceiver) {
      this.conditionReceiver = cr;
    }

    abstract execute(): void;
  }

  /** 開機指令 */
  class TurnOn extends AbsCommand {
    constructor(cr: ConditionReceiver) {
      super(cr);
    }

    execute(): void {
      console.log('Turn on command產生, 進入執行');
      this.conditionReceiver.on();
    }
  }

  /** 關機指令 */
  class TurnOff extends AbsCommand {
    constructor(cr: ConditionReceiver) {
      super(cr);
    }

    execute(): void {
      console.log('Turn off command產生, 進入執行');
      this.conditionReceiver.off();
    }
  }

  /** 冷氣指令 */
  class MakeCool extends AbsCommand {
    constructor(cr: ConditionReceiver) {
      super(cr);
    }

    execute(): void {
      console.log('Make cool command產生, 進入執行');
      this.conditionReceiver.cool();
    }
  }

  /** 暖氣指令 */
  class MakeWarn extends AbsCommand {
    constructor(cr: ConditionReceiver) {
      super(cr);
    }

    execute(): void {
      console.log('Make warn command產生, 進入執行');
      this.conditionReceiver.warn();
    }
  }

  /** 遙控器 */
  class AppInvoker {
    private turnOn: Command;
    private turnOff: Command;
    private makeCool: Command;
    private makeWarn: Command;

    setTurnOn(on: Command): void {
      this.turnOn = on;
    }

    setTurnOff(off: Command): void {
      this.turnOff = off;
    }

    setMakeCool(makeCool: Command): void {
      this.makeCool = makeCool;
    }

    setMakeWarn(makeWarn: Command): void {
      this.makeWarn = makeWarn;
    }

    on(): void {
      this.turnOn.execute();
    }

    off(): void {
      this.turnOff.execute();
    }

    cool(): void {
      this.makeCool.execute();
    }

    warn(): void {
      this.makeWarn.execute();
    }
  }

  const cr = new ConditionReceiver(); // receiver
  const app = new AppInvoker();

  // command setting. 設定receiver, 以及綁定receiver和command設定
  const turnOnCommand = new TurnOn(cr);
  const turnOffCommand = new TurnOff(cr);
  const makeCoolCommand = new MakeCool(cr);
  const makeWarnCommand = new MakeWarn(cr);

  // app setting. 透過app介面設定, 綁定app和command的設定, app扮演的角色是request
  app.setTurnOn(turnOffCommand);
  app.setTurnOff(turnOffCommand);
  app.setMakeCool(makeCoolCommand);
  app.setMakeWarn(makeWarnCommand);

  app.on();
  app.off();
  app.cool();
  app.warn();
}