/**
 * 
 * MQTT Client Manager (IoT 場景)
 * 實際情境:
 * 平台要管理數千 iot devices。
 * 這些燈透過 MQTT Broker 傳輸資料 (如 on/off, brightness, fault status)。
 * 如果每個模組 (DeviceModule, LoggerModule, AlertModule, etc.) 都 new MQTT client → broker 會承受成千上萬的連線。
 * 
 * 👉 解法：建立一個 MqttClientManager (Singleton)，整個系統就只有一個 MQTT 連線，其他模組透過它做：
 * publish(topic, payload)
 * subscribe(topic, handler)
 * 
 */

import { connect, MqttClient } from "mqtt";

{
  const config = {
    appVersion: "1.0.3",
    server: {
      host: "127.0.0.1",
      port: 3000,
    },
    database: {
      host: "192.168.1.200",
      port: 5432,
      user: "admin",
      password: "secret123",
      name: "mydb",
    },
    mqtt: {
      brokerUrl: "mqtt://127.0.0.1:1883",
      username: "george",
      password: "123",
    },
  }


  class MqttClientManager {
    private static instance: MqttClientManager | null = null;
    private client: MqttClient;
    private isConnected: boolean = false;

    private constructor() {
      this.client = connect(config.mqtt.brokerUrl, {
        username: config.mqtt.username,
        password: config.mqtt.password,
      });

      this.client.on('connect', () => {
        this.isConnected = true;
        console.log("✅ MQTT connected to", config.mqtt.brokerUrl);
      });

      this.client.on('error', (err: Error) => {
        this.isConnected = false;
        console.error("❌ MQTT error:", err.message);
      });

      this.client.on('disconnect', () => {
        this.isConnected = false;
        console.log("⚠️ MQTT disconnected");
      });
    }

    public static getInstance(): MqttClientManager {
      if (!MqttClientManager.instance) {
        MqttClientManager.instance = new MqttClientManager();
      }
      return MqttClientManager.instance;
    }

    public publish(topic: string, message: string) {
      if (!this.isConnected) {
        console.error("❌ Cannot publish: MQTT not connected");
        return;
      }
      
      this.client.publish(topic, message, (err) => {
        if (err) {
          console.error("❌ Publish error:", err);
        } else {
          console.log("📤 Published to", topic, ":", message);
        }
      });
    }

    public subscribe(topic: string, callback: (msg: string) => void) {
      this.client.subscribe(topic, (err: Error | null) => {
        if (err) {
          console.error("❌ Subscribe error:", err);
          return;
        }
        console.log("✅ Subscribed to topic:", topic);
      });
      
      // 只綁定一次 message 事件
      this.client.on('message', (recvTopic: string, payload: Buffer) => {
        if (recvTopic === topic) {
          callback(payload.toString());
        }
      });
    }

    public disconnect() {
      this.client.end();
    }
  }

  const mqttManager = MqttClientManager.getInstance();
  
  // 等待連線建立後再開始測試
  setTimeout(() => {
    mqttManager.subscribe('streetlight/1/status', (msg) => {
      console.log("📡 Received:", msg);
    });

    // 模擬開關 - 每2秒發送一次
    setInterval(() => {
      const timestamp = new Date().toISOString();
      mqttManager.publish("streetlight/1/control", JSON.stringify({ 
        on: true, 
        timestamp: timestamp,
        deviceId: "streetlight-001"
      }));
    }, 2000);
  }, 1000); // 等待1秒讓MQTT連線建立
}