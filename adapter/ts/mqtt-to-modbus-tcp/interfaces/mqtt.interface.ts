

export interface IMqttMessage {
  topic: string;
  payload: Buffer | string; // 建議使用 Buffer 以便處理二進制數據
  qos?: number;
  retain?: boolean;
}


export interface IMqttClient {
  connect(options?: any): Promise<void>;
  publish(message: IMqttMessage): Promise<void>;
  subscribe(topic: string | string[], options?: any): Promise<void>;
  onMessage(callback: (topic: string, payload: Buffer, packet: any) => void): void;
  disconnect(): Promise<void>;
}
