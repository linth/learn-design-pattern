class Notification {
  channel: 'email' | 'sms' | 'slack' = "email";
  to: string = "";
  title?: string = "";
  body: string = "";
  priority: 'low' | 'normal' | 'high' = "low";
  metadata?: Record<string, any>;
}


export class NotificationBuilder {
  private notification = new Notification();

  // 通知給某位 user
  to(userId: string) {
    this.notification.to = userId;
    return this;
  }

  // 經過那個 channel 通知，如：email, sms, slack
  via(channel: Notification['channel']) {
    this.notification.channel = channel;
    return this;
  }

  // 標題
  title(title: string) {
    this.notification.title = title;
    return this;
  }

  // 內容
  body(body: string) {
    this.notification.body = body;
    return this;
  }

  // 優先權
  priority(level: Notification['priority']) {
    this.notification.priority = level;
    return this;
  }

  // 建立
  build(): Notification {
    if (!this.notification.to || !this.notification.body) {
      throw new Error('Invalid notification');
    }
    return this.notification;
  }
}
