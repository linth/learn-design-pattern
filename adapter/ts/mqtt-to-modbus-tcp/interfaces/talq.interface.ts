// src/interfaces/talq.interface.ts

// 簡化的 TALQ 訊息結構 (基於 TALQ 規範的簡單示範)
export interface ITALQMessage {
  messageId: string;
  senderId: string;
  receiverId?: string;
  timestamp: string; // ISO 8601 格式
  messageType: string; // 例如: "Command", "Status", "Alert"
  payload: any; // 可以是任何 JSON 結構
  // 根據實際 TALQ 規範添加更多字段
}

export interface ITALQClient {
  connect(options?: any): Promise<void>;
  sendMessage(message: ITALQMessage): Promise<void>;
  disconnect(): Promise<void>;
}