"use strict";
class RedState {
    handle(trafficLight) {
        console.log("Red Light: Stopped");
        trafficLight.setState(new GreenState());
    }
}
class YellowState {
    handle(trafficLight) {
        console.log("Yellow Light: Be prepared to stop");
        trafficLight.setState(new RedState());
    }
}
class GreenState {
    handle(trafficLight) {
        console.log("Green Light: Go");
        trafficLight.setState(new YellowState());
    }
}
class TrafficLight {
    constructor() {
        this.state = new RedState();
    }
    setState(state) {
        this.state = state;
    }
    change() {
        this.state.handle(this);
    }
}
const trafficLight = new TrafficLight();
for (let i = 0; i < 6; i++) {
    trafficLight.change();
}
