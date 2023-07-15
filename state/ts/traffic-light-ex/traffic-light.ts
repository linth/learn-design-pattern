interface TrafficLightState {
  handle(trafficLight: TrafficLight): void;
}

class RedState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log("Red Light: Stopped");
    trafficLight.setState(new GreenState());
  }
}

class YellowState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log("Yellow Light: Be prepared to stop");
    trafficLight.setState(new RedState());
  }
}

class GreenState implements TrafficLightState {
  handle(trafficLight: TrafficLight): void {
    console.log("Green Light: Go");
    trafficLight.setState(new YellowState());
  }
}

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
