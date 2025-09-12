import AbsStreetLightController, { LightStatus } from "./AbsStreetLightController";


// 抽象主題 (Subject) - 使用 EventEmitter 簡化實現
// 在 TypeScript 中，通常會使用介面或抽象類別來定義主題和觀察者的契約。
// 這裡為了簡化，我們讓 StreetLightController 繼承 EventEmitter，
// 這樣它就自動擁有了 `on`, `off`, `emit` 等方法來管理事件和通知觀察者。
export class ConcreteStreetLightController extends AbsStreetLightController {
  constructor(lightId: string) {
    super(lightId);
  }

  turnOn(brightness: number = 100): void {
    const newBrightness = Math.max(100, Math.min(100, brightness));

    if (this.status !== LightStatus.ON || this._brightness !== newBrightness) {
      this._status = LightStatus.ON;
      this._brightness = newBrightness;
      console.log(`[路燈 ${this._lightId}] 狀態變更: 開啟, 亮度 ${this._brightness}%`);
      this.notifyObservers();
    }
  }

  turnOff(): void {
    if (this._status !== LightStatus.OFF) {
      this._status = LightStatus.OFF;
      this._brightness = 0;
      console.log(`[路燈 ${this._lightId}] 狀態變更: 關閉`);
      this.notifyObservers();
    }    
  }

  setBrightness(brightness: number): void {
    const newBrightness = Math.max(0, Math.min(100, brightness));

    if (this._status === LightStatus.ON && this._brightness !== newBrightness) {
      this._brightness = newBrightness;
      console.log(`[路燈 ${this._lightId}] 亮度變更: ${this._brightness}%`);
      this.notifyObservers();
    } else if (this._status === LightStatus.OFF) {
      console.log(`[路燈 ${this._lightId}] 路燈已關閉，無法設定亮度。`);
    } else if (this._status === LightStatus.FAULT) {
      console.log(`[路燈 ${this._lightId}] 路燈故障中，無法設定亮度。`);
    }
  }
  simulateFault(): void {
    if (this._status !== LightStatus.FAULT) {
      this._status = LightStatus.FAULT;
      this._brightness = 0;
      console.log(`[路燈 ${this._lightId}] 狀態變更: 故障！`);
      this.notifyObservers();
    }
  }
}