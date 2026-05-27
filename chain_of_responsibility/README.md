# Chain of Responsibility（責任鏈模式）

## 介紹說明

責任鏈模式是一種**行為型設計模式**，透過將請求沿著一條處理器鏈傳遞，讓每個處理器有機會處理請求，直到某個處理器處理完畢或鏈條結束。請求的發送者不需要知道哪個處理器會處理它，實現了請求與處理的解耦。

核心概念：
- **處理器介面（Handler Interface）**：定義處理請求與設定下一個處理器的共同規範
- **抽象處理器（Abstract Handler）**：實作預設的鏈式行為（儲存下一個處理器的參考，傳遞請求）
- **具體處理器（Concrete Handler）**：決定是否處理當前請求，或將請求傳遞給下一個處理器
- **客戶端（Client）**：組裝責任鏈並發送請求

## 使用時機

- 需要多個處理器依序處理同一請求，且處理器數量或順序可能動態調整
- 請求的處理者需要在執行時期決定，而非編譯時期固定
- 想要避免大量的 if-else 判斷「由誰處理」
- 希望新增或移除處理邏輯時不需修改既有程式碼（符合 OCP）

## 使用情境

### 情境一：請假審批流程

員工請假需根據天數由不同主管審批：組長核准 1-3 天，經理核准 4-7 天，總監核准 8-15 天，15 天以上需 CEO 核准。

```python
chain = LeaveHandler()
chain \
    .set_next(TeamLeadHandler()) \
    .set_next(ManagerHandler()) \
    .set_next(DirectorHandler()) \
    .set_next(CEOHandler())

chain.handle(LeaveRequest(2))   # 組長核准
chain.handle(LeaveRequest(10))  # 總監核准
```

```csharp
var chain = new TeamLeadHandler();
chain.SetNext(new ManagerHandler())
     .SetNext(new DirectorHandler())
     .SetNext(new CEOHandler());

chain.Handle(new LeaveRequest(2));   // 組長核准
chain.Handle(new LeaveRequest(10));  // 總監核准
```

```typescript
const chain = new TeamLeadHandler();
chain.setNext(new ManagerHandler())
     .setNext(new DirectorHandler())
     .setNext(new CEOHandler());

chain.handle(new LeaveRequest(2));   // 組長核准
chain.handle(new LeaveRequest(10));  // 總監核准
```

### 情境二：轉帳風控驗證

線上轉帳根據金額採用不同安全驗證等級：1000 元以下直接轉出，1000 ~ 10000 需簡訊驗證，10000 元以上需人臉辨識。

```python
chain = FirstRiskControlHandler()
chain \
    .set_next(SecondRiskControlHandler()) \
    .set_next(ThirdRiskControlHandler())

chain.handle(TransferRequest(500))    # 簡單轉帳操作
chain.handle(TransferRequest(5000))   # 簡訊驗證
chain.handle(TransferRequest(50000))  # 人臉辨識
```

```csharp
var chain = new FirstRiskControlHandler();
chain.SetNext(new SecondRiskControlHandler())
     .SetNext(new ThirdRiskControlHandler());

chain.Handle(new TransferRequest(500));    // 簡單轉帳操作
chain.Handle(new TransferRequest(5000));   // 簡訊驗證
chain.Handle(new TransferRequest(50000));  // 人臉辨識
```

```typescript
const chain = new FirstRiskControlHandler();
chain.setNext(new SecondRiskControlHandler())
     .setNext(new ThirdRiskControlHandler());

chain.handle(new TransferRequest(500));    // 簡單轉帳操作
chain.handle(new TransferRequest(5000));   // 簡訊驗證
chain.handle(new TransferRequest(50000));  // 人臉辨識
```

### 情境三：優惠券處理系統

電子商務系統支援多種優惠券類型（折扣券、免運券、滿減券），每種優惠券由對應的處理器處理，不符合條件的自動傳遞給下一個處理器。

```python
chain = DiscountCouponHandler()
chain \
    .set_next(ThresholdCouponHandler()) \
    .set_next(FreeShippingCouponHandler())

chain.handle(CouponRequest('DISCOUNT123', 100))   # 折扣處理
chain.handle(CouponRequest('THRESHOLD456', 200))  # 滿減處理
chain.handle(CouponRequest('FREESHIP789', 0))     # 免運處理
```

```csharp
var chain = new DiscountCouponHandler();
chain.SetNext(new ThresholdCouponHandler())
     .SetNext(new FreeShippingCouponHandler());

chain.Handle(new CouponRequest("DISCOUNT123", 100));   // 折扣處理
chain.Handle(new CouponRequest("THRESHOLD456", 200));  // 滿減處理
chain.Handle(new CouponRequest("FREESHIP789", 0));     // 免運處理
```

```typescript
const chain = new DiscountCouponHandler();
chain.setNext(new ThresholdCouponHandler())
     .setNext(new FreeShippingCouponHandler());

chain.handle(new CouponRequest('DISCOUNT123', 100));   // 折扣處理
chain.handle(new CouponRequest('THRESHOLD456', 200));  // 滿減處理
chain.handle(new CouponRequest('FREESHIP789', 0));     // 免運處理
```

### 情境四：日誌層級處理

日誌系統根據日誌層級（DEBUG、INFO、WARN、ERROR）決定如何處理：DEBUG 寫入詳細檔案，INFO 寫入一般日誌，WARN 發送警報，ERROR 發送郵件通知。

```python
chain = DebugLogHandler()
chain \
    .set_next(InfoLogHandler()) \
    .set_next(WarnLogHandler()) \
    .set_next(ErrorLogHandler())

chain.handle(LogEntry('DEBUG', '系統啟動中'))            # 寫入詳細日誌
chain.handle(LogEntry('WARN', '磁碟空間不足'))           # 發送警報
chain.handle(LogEntry('ERROR', '資料庫連線失敗'))         # 發送郵件
```

```csharp
var chain = new DebugLogHandler();
chain.SetNext(new InfoLogHandler())
     .SetNext(new WarnLogHandler())
     .SetNext(new ErrorLogHandler());

chain.Handle(new LogEntry("DEBUG", "系統啟動中"));        // 寫入詳細日誌
chain.Handle(new LogEntry("WARN", "磁碟空間不足"));       // 發送警報
chain.Handle(new LogEntry("ERROR", "資料庫連線失敗"));     // 發送郵件
```

```typescript
const chain = new DebugLogHandler();
chain.setNext(new InfoLogHandler())
     .setNext(new WarnLogHandler())
     .setNext(new ErrorLogHandler());

chain.handle(new LogEntry('DEBUG', '系統啟動中'));        // 寫入詳細日誌
chain.handle(new LogEntry('WARN', '磁碟空間不足'));       // 發送警報
chain.handle(new LogEntry('ERROR', '資料庫連線失敗'));     // 發送郵件
```

### 情境五：HTTP 中介軟體管線

Web 框架的請求處理管線由多個中介軟體組成：身分驗證 → 角色授權 → 請求記錄 → 最終處理。每個中介軟體可以決定是否中斷或傳遞請求。

```python
chain = AuthMiddleware()
chain \
    .set_next(RoleMiddleware()) \
    .set_next(LoggingMiddleware()) \
    .set_next(HandlerMiddleware())

chain.handle(HttpRequest('/admin', token='valid', role='admin'))  # 通過
chain.handle(HttpRequest('/admin', token='valid', role='guest'))  # 角色不足
chain.handle(HttpRequest('/admin', token='', role='guest'))       # 未驗證
```

```csharp
var chain = new AuthMiddleware();
chain.SetNext(new RoleMiddleware())
     .SetNext(new LoggingMiddleware())
     .SetNext(new HandlerMiddleware());

chain.Handle(new HttpRequest("/admin", "valid", "admin"));  // 通過
chain.Handle(new HttpRequest("/admin", "valid", "guest"));  // 角色不足
chain.Handle(new HttpRequest("/admin", "", "guest"));       // 未驗證
```

```typescript
const chain = new AuthMiddleware();
chain.setNext(new RoleMiddleware())
     .setNext(new LoggingMiddleware())
     .setNext(new HandlerMiddleware());

chain.handle(new HttpRequest('/admin', 'valid', 'admin'));  // 通過
chain.handle(new HttpRequest('/admin', 'valid', 'guest'));  // 角色不足
chain.handle(new HttpRequest('/admin', '', 'guest'));       // 未驗證
```

### 情境六：技術支援客服分層

客服系統根據問題類型分層處理：FAQ 機器人處理常見問題，第一線客服處理簡單問題，第二線客服處理複雜問題，無法處理則轉接主管。

```python
chain = FAQBotHandler()
chain \
    .set_next(Level1SupportHandler()) \
    .set_next(Level2SupportHandler()) \
    .set_next(ManagerHandler())

chain.handle(SupportTicket('faq', '如何重設密碼'))               # FAQ 機器人
chain.handle(SupportTicket('billing', '帳單有誤'))               # 第一線
chain.handle(SupportTicket('technical', '系統當機'))              # 第二線
chain.handle(SupportTicket('complaint', '我要投訴'))              # 主管
```

```csharp
var chain = new FAQBotHandler();
chain.SetNext(new Level1SupportHandler())
     .SetNext(new Level2SupportHandler())
     .SetNext(new ManagerHandler());

chain.Handle(new SupportTicket("faq", "如何重設密碼"));           // FAQ 機器人
chain.Handle(new SupportTicket("billing", "帳單有誤"));           // 第一線
chain.Handle(new SupportTicket("technical", "系統當機"));         // 第二線
chain.Handle(new SupportTicket("complaint", "我要投訴"));         // 主管
```

```typescript
const chain = new FAQBotHandler();
chain.setNext(new Level1SupportHandler())
     .setNext(new Level2SupportHandler())
     .setNext(new ManagerHandler());

chain.handle(new SupportTicket('faq', '如何重設密碼'));           // FAQ 機器人
chain.handle(new SupportTicket('billing', '帳單有誤'));           // 第一線
chain.handle(new SupportTicket('technical', '系統當機'));         // 第二線
chain.handle(new SupportTicket('complaint', '我要投訴'));         // 主管
```

### 情境七：動物食物處理（概念範例）

經典的責任鏈入門範例：猴子吃香蕉、松鼠吃堅果、狗吃肉丸。每個動物處理器只處理自己喜歡的食物，不喜歡的傳給下一個。

```python
chain = MonkeyHandler()
chain \
    .set_next(SquirrelAnimalHandler()) \
    .set_next(DogFoodHandler())

chain.handle('Banana')    # Monkey: I'll eat the Banana
chain.handle('Nut')       # Squirrel: I'll eat the Nut
chain.handle('Coffee')    # 沒有任何動物處理，請求被忽略
```

```csharp
var chain = new MonkeyHandler();
chain.SetNext(new SquirrelAnimalHandler())
     .SetNext(new DogFoodHandler());

chain.Handle("Banana");    // Monkey: I'll eat the Banana
chain.Handle("Nut");       // Squirrel: I'll eat the Nut
chain.Handle("Coffee");    // 沒有任何動物處理，請求被忽略
```

```typescript
const chain = new MonkeyHandler();
chain.setNext(new SquirrelAnimalHandler())
     .setNext(new DogFoodHandler());

chain.handle('Banana');    // Monkey: I'll eat the Banana
chain.handle('Nut');       // Squirrel: I'll eat the Nut
chain.handle('Coffee');    // 沒有任何動物處理，請求被忽略
```

### 情境八：設備輪詢處理（SNMP / IoT）

網路監控系統中，不同類型的設備使用不同的輪詢協定。SNMP 設備由 SNMP 處理器負責，IoT 設備由 IoT 處理器負責。

```python
chain = SNMPHandlerDevice()
chain.set_next(IoTHandlerDevice())

chain.handle(SNMPDevice())    # Polling SNMP device...
chain.handle(IoTDevicePoll()) # Polling IoT device...
```

```csharp
var chain = new SNMPHandler();
chain.SetNext(new IoTHandler());

chain.Handle(new SNMPDevice());   // Polling SNMP device...
chain.Handle(new IoTDevice());    // Polling IoT device...
```

```typescript
const chain = new SNMPHandlerDevice();
chain.setNext(new IoTHandlerDevice());

chain.handle(new SNMPDevice());   // Polling SNMP device...
chain.handle(new IoTDevicePoll());// Polling IoT device...
```

## 檔案連結

- [Python 完整實作](./py/chain_of_responsibility.py)
- [C# 完整實作](./cs/ChainOfResponsibility.cs)
- [TypeScript 完整實作](./ts/chain_of_responsibility.ts)

## 優點

- **符合 OCP**：新增處理器不需修改既有程式碼，只需新增類別並插入鏈條
- **降低耦合**：請求發送者與接收者彼此不知道對方存在
- **靈活性高**：可在執行時期動態調整處理器的順序與組合
- **職責單一**：每個處理器只專注於自己負責的邏輯（SRP）

## 缺點

- **請求未被處理**：若鏈條末端沒有處理器能處理請求，可能被忽略
- **除錯困難**：請求在鏈條中傳遞，不易追蹤最終由誰處理
- **鏈條過長**：若處理器過多，效能可能受影響
- **濫用風險**：可能將簡單的條件判斷過度設計為責任鏈

## Reference

- [Refactoring Guru - Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)
- [Wikipedia - Chain-of-responsibility pattern](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)
