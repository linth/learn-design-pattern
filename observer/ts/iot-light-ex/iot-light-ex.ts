import AbsStreetLightController, { LightStatus, SmartLightState } from './AbsStreetLightController';
import { ConcreteStreetLightController } from './ConcreteStreetLightController';
import { 
  AlertSystem, 
  DashboardDisplay, 
  LoggingService 
} from './monitoring-system';



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
  lightControllerA.on('update', (state: SmartLightState) => dashboard.update(state));
  console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${dashboard.name}`);
  lightControllerB.on('update', (state: SmartLightState) => dashboard.update(state));
  console.log(`[路燈 ${lightControllerB.lightId}] 添加監控服務: ${dashboard.name}`);
  lightControllerC.on('update', (state: SmartLightState) => dashboard.update(state));
  console.log(`[路燈 ${lightControllerC.lightId}] 添加監控服務: ${dashboard.name}`);

  // 警報系統只監控 SL-001 和 SL-003 的故障
  const slc1AlertListener = (state: SmartLightState) => alertSystem.update(state);
  lightControllerA.on('update', slc1AlertListener);
  console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${alertSystem.name}`);
  const slc3AlertListener = (state: SmartLightState) => alertSystem.update(state);
  lightControllerC.on('update', slc3AlertListener);
  console.log(`[路燈 ${lightControllerC.lightId}] 添加監控服務: ${alertSystem.name}`);

  // 日誌服務監控所有路燈
  lightControllerA.on('update', (state: SmartLightState) => loggingService.update(state));
  console.log(`[路燈 ${lightControllerA.lightId}] 添加監控服務: ${loggingService.name}`);
  lightControllerB.on('update', (state: SmartLightState) => loggingService.update(state));
  console.log(`[路燈 ${lightControllerB.lightId}] 添加監控服務: ${loggingService.name}`);
  lightControllerC.on('update', (state: SmartLightState) => loggingService.update(state));
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