import { EventEmitter } from "events";


export enum LightStatus {
  ON,
  OFF,
  FAULT,
}

export interface SmartLightState {
  lightId: string;
  status: LightStatus; // ON, OFF, FAULT
  brightness: number; // 0-100
}

// abstract class
export default abstract class AbsStreetLightController extends EventEmitter {
  protected _lightId: string;
  protected _status: LightStatus;
  protected _brightness: number;

  constructor(lightId: string) {
    super();
    this._lightId = lightId;
    this._status = LightStatus.OFF;
    this._brightness = 0;
  }

  get lightId(): string {
    return this._lightId;
  }

  get status(): LightStatus {
    return this._status;
  }

  get brightness(): number {
    return this._brightness;
  }

  protected notifyObservers(): void {
    this.emit('update', {
      lightId: this.lightId,
      status: this.status,
      brightness: this.brightness,
    } as SmartLightState);
  }

  abstract turnOn(brightness?: number): void;
  abstract turnOff(): void;
  abstract setBrightness(brightness: number): void;
  abstract simulateFault(): void;
}