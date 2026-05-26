/**
 * 狀態模式 (State Pattern) - 紅綠燈範例
 * 紅燈 → 綠燈 → 黃燈 → 紅燈 循環切換。
 */

/** [狀態介面] 紅綠燈狀態 */
interface TrafficLightState {
  handle(trafficLight: TrafficLight): void;
}

/** [具體狀態] 紅燈 */
class RedState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log('🔴 紅燈：停止');
    trafficLight.setState(new GreenState());
  }
}

/** [具體狀態] 黃燈 */
class YellowState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log('🟡 黃燈：準備停止');
    trafficLight.setState(new RedState());
  }
}

/** [具體狀態] 綠燈 */
class GreenState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log('🟢 綠燈：前進');
    trafficLight.setState(new YellowState());
  }
}

/** [環境類別] 紅綠燈，持有當前燈號狀態 */
class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedState();
  }

  setState(state: TrafficLightState): void {
    this.state = state;
  }

  change(): void {
    this.state.handle(this);
  }
}

const trafficLight = new TrafficLight();

for (let i = 0; i < 6; i++) {
  trafficLight.change();
}
