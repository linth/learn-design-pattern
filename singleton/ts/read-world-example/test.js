// 模擬開關
setInterval(() => {
  mqttManager.publish("streetlight/1/control", JSON.stringify({ on: true }));
}, 5000);