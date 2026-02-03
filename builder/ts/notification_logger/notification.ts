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

  to(userId: string) {
    this.notification.to = userId;
    return this;
  }

  via(channel: Notification['channel']) {
    this.notification.channel = channel;
    return this;
  }

  title(title: string) {
    this.notification.title = title;
    return this;
  }

  body(body: string) {
    this.notification.body = body;
    return this;
  }

  priority(level: Notification['priority']) {
    this.notification.priority = level;
    return this;
  }

  build(): Notification {
    if (!this.notification.to || !this.notification.body) {
      throw new Error('Invalid notification');
    }
    return this.notification;
  }
}
