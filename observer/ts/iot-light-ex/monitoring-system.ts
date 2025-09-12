import { LightStatus, SmartLightState } from "./AbsStreetLightController";


// observer
export interface MonitoringSystem {
  name: string;
  update(state: SmartLightState): void;
}


// dashboard observer
export class DashboardDisplay implements MonitoringSystem {
  name: string; 

  constructor(name: string = '儀表板顯示') {
    this.name = name;
  }

  update(state: SmartLightState): void {
    console.log(`  [${this.name}] 收到路燈 ${state.lightId} 更新: 狀態=${state.status}, 亮度=${state.brightness}%`);

    if (state.status === LightStatus.FAULT) {
      console.log(`  [${this.name}] 警告: 路燈 ${state.lightId} 發生故障！`);
    }
  }
}

// alter observer
export class AlertSystem implements MonitoringSystem {
  name: string;

  constructor(name: string = '警報系統') {
    this.name = name;
  }

  update(state: SmartLightState): void {
    if (state.status === LightStatus.FAULT) {
      console.log(`  [${this.name}] !!! 緊急警報 !!! 路燈 ${state.lightId} 故障，請立即處理！`);
    } else if (state.status === LightStatus.OFF && state.brightness === 0) {
      console.log(`  [${this.name}] 通知: 路燈 ${state.lightId} 已關閉。`);      
    }
  }
}

// logging observer
export class LoggingService implements MonitoringSystem {
  name: string;

  constructor(name: string = '日誌服務') {
    this.name = name;
  }

  update(state: SmartLightState): void {
    console.log(`  [${this.name}] 記錄: 路燈 ${state.lightId} 狀態從 ${state.status} 變更，亮度 ${state.brightness}%`);
  }
}
