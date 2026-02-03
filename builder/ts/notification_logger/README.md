# 「Notification Builder + Logger Context Builder」
👉 **一個負責組裝通知內容**
👉 **一個負責組裝可觀測性（log / trace）**

---

## 一、整體架構先給你一張腦內圖

```
[ Business Logic ]
        |
        v
[ NotificationBuilder ]  ---> Notification (pure data)
        |
        v
[ LoggerContextBuilder ] ---> LogContext
        |
        v
[ MQ / Job Queue ] -----> Notification Worker
                                |
                                v
                         Send Email / SMS / Slack
                                |
                                v
                             Logger
```

> **Builder 永遠只做「組裝」**
> **行為（send / retry / fallback）交給後面**

---

## 二、Notification Builder（#2）— 組裝「要送什麼」

### 🎯 核心責任
* 把 **零散的商業資料**
* 組成一個 **結構完整、可序列化、可重送的 Notification**

### 🧱 範例（TypeScript）

```ts
class Notification {
  channel: 'email' | 'sms' | 'slack';
  to: string;
  title?: string;
  body: string;
  priority: 'low' | 'normal' | 'high';
  metadata?: Record<string, any>;
}
```

```ts
class NotificationBuilder {
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
```

### 📌 重點

* ❌ **不送**
* ❌ **不 log**
* ❌ **不碰 MQ**
* ✅ 只保證 `build()` 出來的資料是「合法通知」

---

## 三、Logger Context Builder（#3）— 組裝「怎麼被觀察」

### 🎯 為什麼不能直接 `logger.info({ ... })`？

因為你會得到：

* 每個人 log 欄位不一樣
* tracing 斷掉
* debug 地獄

### 🧱 Logger Context Builder

```ts
class LogContext {
  requestId?: string;
  traceId?: string;
  action?: string;
  userId?: string;
  payload?: any;
  status?: 'success' | 'fail';
  error?: any;
}
```

```ts
class LogContextBuilder {
  private ctx = new LogContext();

  request(reqId: string) {
    this.ctx.requestId = reqId;
    return this;
  }

  action(action: string) {
    this.ctx.action = action;
    return this;
  }

  user(userId: string) {
    this.ctx.userId = userId;
    return this;
  }

  payload(data: any) {
    this.ctx.payload = data;
    return this;
  }

  success() {
    this.ctx.status = 'success';
    return this;
  }

  fail(error: any) {
    this.ctx.status = 'fail';
    this.ctx.error = error;
    return this;
  }

  build(): LogContext {
    return this.ctx;
  }
}
```

---

## 四、2 + 3 怎麼「一起用」？（關鍵）

### 🎬 實際流程範例：訂單完成通知

```ts
const notification = new NotificationBuilder()
  .to(user.id)
  .via('email')
  .title('訂單完成')
  .body(`你的訂單 ${order.id} 已完成`)
  .priority('high')
  .build();
```

```ts
const logCtx = new LogContextBuilder()
  .request(req.id)
  .action('SendOrderNotification')
  .user(user.id)
  .payload(notification)
  .success()
  .build();
```

```ts
logger.info(logCtx);
mq.publish('notification.send', notification);
```

### 🔥 為什麼這樣設計「很乾淨」？

| Concern | 負責者                  |
| ------- | -------------------- |
| 通知內容長怎樣 | NotificationBuilder  |
| 是否可送    | NotificationBuilder  |
| 怎麼追蹤    | LoggerContextBuilder |
| 何時送     | MQ / Worker          |
| 失敗重試    | Worker               |
| log 結構  | LoggerContextBuilder |

👉 **單一職責 + 高可測試性**

---

## 五、這組合在「大型系統」的價值

### ✔ 優點

* log 結構 100% 統一
* MQ payload 穩定（可 replay）
* Builder 可以獨立寫 unit test
* 通知與業務完全解耦

### ❌ 常見錯誤設計

```ts
sendEmail(user, title, body);
logger.info('send email success');
```

➡ 你之後一定補不完 context

---

## 六、一句工程師級結論（給你收斂）

> **Notification Builder 解決「我要送什麼」**
> **Logger Context Builder 解決「系統怎麼被理解」**
>
> 兩個合起來，系統才「可維運」。
