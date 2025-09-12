import { EventEmitter } from 'events';

// 抽象主題 (Subject) - 使用 EventEmitter 簡化實現
// 在 TypeScript 中，通常會使用介面或抽象類別來定義主題和觀察者的契約。
// 這裡為了簡化，我們讓 StreetLightController 繼承 EventEmitter，
// 這樣它就自動擁有了 `on`, `off`, `emit` 等方法來管理事件和通知觀察者。
enum LightStatus {
  ON, // 0
  OFF, // 1
  FAULT, // 2
}

interface StreetLightState {
    lightId: string;
    status: 'OFF' | 'ON' | 'FAULT';
    brightness: number; // 0-100
}

abstract class StreetLightController extends EventEmitter {
    protected _lightId: string;
    protected _status: 'OFF' | 'ON' | 'FAULT';
    protected _brightness: number; // 0-100

    constructor(lightId: string) {
        super();
        this._lightId = lightId;
        this._status = 'OFF';
        this._brightness = 0;
    }

    // 在 EventEmitter 的基礎上，我們不需要手動管理 observers 列表和 notify 方法。
    // 而是通過發射事件來通知觀察者。
    // attach 和 detach 方法可以被 `on` 和 `off` 方法替代。

    get lightId(): string {
        return this._lightId;
    }

    get status(): 'OFF' | 'ON' | 'FAULT' {
        return this._status;
    }

    get brightness(): number {
        return this._brightness;
    }

    protected notifyObservers(): void {
        console.log(`\n[路燈 ${this._lightId}] 狀態更新，通知所有監控服務...`);
        // 發射一個 'update' 事件，並傳遞當前路燈的狀態
        this.emit('update', { 
            lightId: this._lightId,
            status: this._status,
            brightness: this._brightness
        } as StreetLightState);
    }

    abstract turnOn(brightness?: number): void;
    abstract turnOff(): void;
    abstract setBrightness(brightness: number): void;
    abstract simulateFault(): void;
}

// 抽象觀察者 (Observer) - 使用介面定義契約
interface MonitoringSystem {
    name: string;
    update(state: StreetLightState): void;
}

// 具體主題 (Concrete Subject)
class ConcreteStreetLightController extends StreetLightController {
    constructor(lightId: string) {
        super(lightId);
    }

    turnOn(brightness: number = 100): void {
        const newBrightness = Math.max(0, Math.min(100, brightness));
        if (this._status !== 'ON' || this._brightness !== newBrightness) {
            this._status = 'ON';
            this._brightness = newBrightness;
            console.log(`[路燈 ${this._lightId}] 狀態變更: 開啟, 亮度 ${this._brightness}%`);
            this.notifyObservers();
        }
    }

    turnOff(): void {
        if (this._status !== 'OFF') {
            this._status = 'OFF';
            this._brightness = 0;
            console.log(`[路燈 ${this._lightId}] 狀態變更: 關閉`);
            this.notifyObservers();
        }
    }

    setBrightness(brightness: number): void {
        const newBrightness = Math.max(0, Math.min(100, brightness));
        if (this._status === 'ON' && this._brightness !== newBrightness) {
            this._brightness = newBrightness;
            console.log(`[路燈 ${this._lightId}] 亮度變更: ${this._brightness}%`);
            this.notifyObservers();
        } else if (this._status === 'OFF') {
            console.log(`[路燈 ${this._lightId}] 路燈已關閉，無法設定亮度。`);
        } else if (this._status === 'FAULT') {
            console.log(`[路燈 ${this._lightId}] 路燈故障中，無法設定亮度。`);
        }
    }

    simulateFault(): void {
        if (this._status !== 'FAULT') {
            this._status = 'FAULT';
            this._brightness = 0;
            console.log(`[路燈 ${this._lightId}] 狀態變更: 故障！`);
            this.notifyObservers();
        }
    }
}

// 具體觀察者 (Concrete Observer)
class DashboardDisplay implements MonitoringSystem {
    name: string;

    constructor(name: string = "儀表板顯示") {
        this.name = name;
    }

    update(state: StreetLightState): void {
        console.log(`  [${this.name}] 收到路燈 ${state.lightId} 更新: 狀態=${state.status}, 亮度=${state.brightness}%`);
        if (state.status === 'FAULT') {
            console.log(`  [${this.name}] 警告: 路燈 ${state.lightId} 發生故障！`);
        }
    }
}

class AlertSystem implements MonitoringSystem {
    name: string;

    constructor(name: string = "警報系統") {
        this.name = name;
    }

    update(state: StreetLightState): void {
        if (state.status === 'FAULT') {
            console.log(`  [${this.name}] !!! 緊急警報 !!! 路燈 ${state.lightId} 故障，請立即處理！`);
        } else if (state.status === 'OFF' && state.brightness === 0) {
            console.log(`  [${this.name}] 通知: 路燈 ${state.lightId} 已關閉。`);
        }
    }
}

class LoggingService implements MonitoringSystem {
    name: string;

    constructor(name: string = "日誌服務") {
        this.name = name;
    }

    update(state: StreetLightState): void {
        console.log(`  [${this.name}] 記錄: 路燈 ${state.lightId} 狀態從 ${state.status} 變更，亮度 ${state.brightness}%`);
    }
}

// --- 範例使用 --- //
async function main() {
    console.log("===== IoT 路燈控制器監控平台 Observer 模式範例 (TypeScript) =====\n");

    // 1. 創建多個路燈控制器 (主題)
    const lightControllerA = new ConcreteStreetLightController("SL-001");
    const lightControllerB = new ConcreteStreetLightController("SL-002");
    const lightControllerC = new ConcreteStreetLightController("SL-003");

    // 2. 創建多個監控服務 (觀察者)
    const dashboard = new DashboardDisplay();
    const alertSystem = new AlertSystem();
    const loggingService = new LoggingService();

    // 3. 監控服務訂閱感興趣的路燈
    // 在 TypeScript 中，我們使用 EventEmitter 的 `on` 方法來訂閱事件。
    // 這裡的 'update' 是我們自定義的事件名稱。

    // 儀表板監控所有路燈
    lightControllerA.on('update', (state: StreetLightState) => dashboard.update(state));
    console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${dashboard.name}`);
    lightControllerB.on('update', (state: StreetLightState) => dashboard.update(state));
    console.log(`[路燈 ${lightControllerB.lightId}] 添加監控服務: ${dashboard.name}`);
    lightControllerC.on('update', (state: StreetLightState) => dashboard.update(state));
    console.log(`[路燈 ${lightControllerC.lightId}] 添加監控服務: ${dashboard.name}`);

    // 警報系統只監控 SL-001 和 SL-003 的故障
    const slc1AlertListener = (state: StreetLightState) => alertSystem.update(state);
    lightControllerA.on('update', slc1AlertListener);
    console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${alertSystem.name}`);
    const slc3AlertListener = (state: StreetLightState) => alertSystem.update(state);
    lightControllerC.on('update', slc3AlertListener);
    console.log(`[路燈 ${lightControllerC.lightId}] 添加監控服務: ${alertSystem.name}`);

    // 日誌服務監控所有路燈
    lightControllerA.on('update', (state: StreetLightState) => loggingService.update(state));
    console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${loggingService.name}`);
    lightControllerB.on('update', (state: StreetLightState) => loggingService.update(state));
    console.log(`[路燈 ${lightControllerB.lightId}] 添加監控服務: ${loggingService.name}`);
    lightControllerC.on('update', (state: StreetLightState) => loggingService.update(state));
    console.log(`[路燈 ${lightControllerC.lightId}] 添加監控服務: ${loggingService.name}`);

    console.log("\n--- 模擬路燈操作與狀態變化 ---");

    console.log("\n--- 路燈 SL-001 開啟 ---");
    lightControllerA.turnOn(80);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n--- 路燈 SL-002 開啟並調整亮度 ---");
    lightControllerB.turnOn(50);
    await new Promise(resolve => setTimeout(resolve, 500));
    lightControllerB.setBrightness(75);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n--- 路燈 SL-003 模擬故障 ---");
    lightControllerC.simulateFault();
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n--- 路燈 SL-001 調整亮度 ---");
    lightControllerA.setBrightness(100);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n--- 路燈 SL-002 關閉 ---");
    lightControllerB.turnOff();
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n--- 警報系統不再監控 SL-003 ---");
    // 為了正確移除，需要使用保存的函數引用
    lightControllerC.off('update', slc3AlertListener);
    console.log(`[路燈 ${lightControllerC.lightId}] 移除監控服務: ${alertSystem.name}`);

    console.log("\n--- 路燈 SL-003 故障排除 (假設修復後重新開啟) ---");
    lightControllerC.turnOn(90);
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("\n===== 範例結束 =====");
}

main();