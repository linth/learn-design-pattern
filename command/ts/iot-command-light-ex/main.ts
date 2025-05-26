

interface ICommand {
  execute(): void; // 執行
  undo(): void; // 撤銷
}



class DeviceService {
  turnOnLight() {
    console.log('💡 Light turned ON');
  }

  turnOffLight() {
    console.log('💡 Light turned OFF');
  }

  setTemperature(value: number) {
    console.log(`🌡️ Temperature set to ${value}°C`);
  }

  resetTemperature() {
    console.log('🌡️ Temperature reset to default');
  }
}


// turn-on-light.command.ts
// 開燈 指令
class TurnOnLightCommand implements ICommand {
  constructor(private deviceService: DeviceService) {}

  execute(): void {
    this.deviceService.turnOnLight();
  }

  undo(): void {
    this.deviceService.turnOffLight();    
  }
}

// set-temperature.command.ts
class SetTemperatureCommand implements ICommand {
  private prevTemp: number = 0;

  constructor(
    private device: DeviceService,
    private temperature: number
  ) {}


  execute(): void {
    // 模擬保存之前的狀態（實務上可從 DB 或 service 拿）
    this.prevTemp = 22;
    this.device.setTemperature(this.temperature);
  }

  undo(): void {
    this.device.setTemperature(this.prevTemp);
  }
}

// command-invoker.ts
// 指令執行器
class CommandInvoker {
  private history: ICommand[] = [];

  // 執行指令
  executeCommand(command: ICommand) {
    command.execute();
    this.history.push(command);
  }

  // 撤銷上一步指令
  undoLast() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
    }
  }
}

{
  // 實際使用
  const deviceService = new DeviceService();
  const invoker = new CommandInvoker();

  // 開燈
  const lightCommand = new TurnOnLightCommand(deviceService);
  // 設定溫度
  const tempCommand = new SetTemperatureCommand(deviceService, 25);

  // 執行開燈
  invoker.executeCommand(lightCommand);
  // 執行設定溫度
  invoker.executeCommand(tempCommand);

  // Undo 最後一個命令（設定溫度）
  invoker.undoLast();

  // 💡 Light turned ON
  // 🌡️ Temperature set to 25°C
  // 🌡️ Temperature set to 22°C

}