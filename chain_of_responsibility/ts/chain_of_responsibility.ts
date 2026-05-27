/**
 * Chain of Responsibility（責任鏈模式）
 * 將請求沿著一條處理器鏈傳遞，每個處理器可決定是否處理請求
 * 或將請求傳遞給下一個處理器。
 */

// [抽象處理器] 帶有預設傳遞行為的基底類別
abstract class AbstractHandler {
  protected nextHandler: AbstractHandler | null = null;

  setNext(handler: AbstractHandler): AbstractHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: unknown): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// ============================================================
// 情境一：請假審批流程
// ============================================================

class LeaveRequest {
  constructor(public days: number) {}
}

class TeamLeadHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LeaveRequest && request.days <= 3)
      console.log(`[組長] 核准 ${request.days} 天請假`);
    else super.handle(request);
  }
}

class ManagerLeaveHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LeaveRequest && request.days <= 7)
      console.log(`[經理] 核准 ${request.days} 天請假`);
    else super.handle(request);
  }
}

class DirectorLeaveHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LeaveRequest && request.days <= 15)
      console.log(`[總監] 核准 ${request.days} 天請假`);
    else super.handle(request);
  }
}

class CEOLeaveHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LeaveRequest)
      console.log(`[CEO] 核准 ${request.days} 天請假（特批）`);
  }
}

// ============================================================
// 情境二：轉帳風控驗證
// ============================================================

class TransferRequest {
  constructor(public money: number) {}
}

class FirstRiskControlHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof TransferRequest && request.money <= 1000)
      console.log(`[初級風控] 簡單轉帳 $${request.money} 完成`);
    else super.handle(request);
  }
}

class SecondRiskControlHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof TransferRequest && request.money <= 10000)
      console.log(`[中級風控] 簡訊驗證轉帳 $${request.money} 完成`);
    else super.handle(request);
  }
}

class ThirdRiskControlHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof TransferRequest)
      console.log(`[高級風控] 人臉辨識轉帳 $${request.money} 完成`);
  }
}

// ============================================================
// 情境三：優惠券處理系統
// ============================================================

class CouponRequest {
  constructor(public code: string, public amount: number) {}
}

class DiscountCouponHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof CouponRequest && request.code.startsWith('DISCOUNT'))
      console.log(`[折扣券] 套用折扣券 ${request.code}`);
    else super.handle(request);
  }
}

class ThresholdCouponHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof CouponRequest && request.code.startsWith('THRESHOLD'))
      console.log(`[滿減券] 套用滿減券 ${request.code}`);
    else super.handle(request);
  }
}

class FreeShippingCouponHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof CouponRequest && request.code.startsWith('FREESHIP'))
      console.log(`[免運券] 套用免運券 ${request.code}`);
    else super.handle(request);
  }
}

// ============================================================
// 情境四：日誌層級處理
// ============================================================

class LogEntry {
  constructor(public level: string, public message: string) {}
}

class DebugLogHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LogEntry && request.level === 'DEBUG')
      console.log(`[DEBUG] 寫入詳細日誌: ${request.message}`);
    else super.handle(request);
  }
}

class InfoLogHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LogEntry && request.level === 'INFO')
      console.log(`[INFO] 寫入一般日誌: ${request.message}`);
    else super.handle(request);
  }
}

class WarnLogHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LogEntry && request.level === 'WARN')
      console.log(`[WARN] 發送警報: ${request.message}`);
    else super.handle(request);
  }
}

class ErrorLogHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof LogEntry && request.level === 'ERROR')
      console.log(`[ERROR] 發送郵件通知: ${request.message}`);
    else super.handle(request);
  }
}

// ============================================================
// 情境五：HTTP 中介軟體管線
// ============================================================

class HttpRequest {
  constructor(
    public path: string,
    public token: string,
    public role: string,
  ) {}
}

class AuthMiddleware extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof HttpRequest && !request.token)
      console.log('[驗證] 拒絕：未提供 Token');
    else super.handle(request);
  }
}

class RoleMiddleware extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof HttpRequest && request.role !== 'admin')
      console.log(`[授權] 拒絕：角色 '${request.role}' 無權限`);
    else super.handle(request);
  }
}

class LoggingMiddleware extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof HttpRequest)
      console.log(`[記錄] ${request.role} 請求 ${request.path}`);
    super.handle(request);
  }
}

class HandlerMiddleware extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof HttpRequest)
      console.log(`[處理] 執行 ${request.path} 處理器`);
  }
}

// ============================================================
// 情境六：技術支援客服分層
// ============================================================

class SupportTicket {
  constructor(
    public category: string,
    public description: string,
  ) {}
}

class FAQBotHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof SupportTicket && request.category === 'faq')
      console.log(`[FAQ機器人] 自動回覆: ${request.description}`);
    else super.handle(request);
  }
}

class Level1SupportHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (
      request instanceof SupportTicket &&
      (request.category === 'billing' || request.category === 'account')
    )
      console.log(`[一線客服] 處理: ${request.description}`);
    else super.handle(request);
  }
}

class Level2SupportHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof SupportTicket && request.category === 'technical')
      console.log(`[二線客服] 處理: ${request.description}`);
    else super.handle(request);
  }
}

class SupportManagerHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof SupportTicket)
      console.log(`[主管] 處理客訴: ${request.description}`);
  }
}

// ============================================================
// 情境七：動物食物處理（概念範例）
// ============================================================

class MonkeyHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (typeof request === 'string' && request === 'Banana')
      console.log(`Monkey: I'll eat the ${request}`);
    else super.handle(request);
  }
}

class SquirrelAnimalHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (typeof request === 'string' && request === 'Nut')
      console.log(`Squirrel: I'll eat the ${request}`);
    else super.handle(request);
  }
}

class DogFoodHandler extends AbstractHandler {
  handle(request: unknown): void {
    if (typeof request === 'string' && request === 'MeatBall')
      console.log(`Dog: I'll eat the ${request}`);
    else super.handle(request);
  }
}

// ============================================================
// 情境八：設備輪詢處理（SNMP / IoT）
// ============================================================

interface Device {
  poll(): void;
}

class SNMPDevice implements Device {
  poll(): void {
    console.log('Polling SNMP device...');
  }
}

class IoTDevicePoll implements Device {
  poll(): void {
    console.log('Polling IoT device...');
  }
}

class SNMPHandlerDevice extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof SNMPDevice) request.poll();
    else super.handle(request);
  }
}

class IoTHandlerDevice extends AbstractHandler {
  handle(request: unknown): void {
    if (request instanceof IoTDevicePoll) request.poll();
    else super.handle(request);
  }
}

// ============================================================
// 執行
// ============================================================

console.log('============================================================');
console.log('Chain of Responsibility 責任鏈模式 範例');
console.log('============================================================');

// 情境一：請假審批
console.log('\n情境一：請假審批流程');
const leaveChain = new TeamLeadHandler();
leaveChain
  .setNext(new ManagerLeaveHandler())
  .setNext(new DirectorLeaveHandler())
  .setNext(new CEOLeaveHandler());
leaveChain.handle(new LeaveRequest(2));
leaveChain.handle(new LeaveRequest(10));
leaveChain.handle(new LeaveRequest(20));

// 情境二：轉帳風控
console.log('\n情境二：轉帳風控驗證');
const riskChain = new FirstRiskControlHandler();
riskChain
  .setNext(new SecondRiskControlHandler())
  .setNext(new ThirdRiskControlHandler());
riskChain.handle(new TransferRequest(500));
riskChain.handle(new TransferRequest(5000));
riskChain.handle(new TransferRequest(50000));

// 情境三：優惠券處理
console.log('\n情境三：優惠券處理系統');
const couponChain = new DiscountCouponHandler();
couponChain
  .setNext(new ThresholdCouponHandler())
  .setNext(new FreeShippingCouponHandler());
couponChain.handle(new CouponRequest('DISCOUNT123', 100));
couponChain.handle(new CouponRequest('THRESHOLD456', 200));
couponChain.handle(new CouponRequest('FREESHIP789', 0));

// 情境四：日誌層級
console.log('\n情境四：日誌層級處理');
const logChain = new DebugLogHandler();
logChain
  .setNext(new InfoLogHandler())
  .setNext(new WarnLogHandler())
  .setNext(new ErrorLogHandler());
logChain.handle(new LogEntry('DEBUG', '系統啟動中'));
logChain.handle(new LogEntry('WARN', '磁碟空間不足'));
logChain.handle(new LogEntry('ERROR', '資料庫連線失敗'));

// 情境五：中介軟體
console.log('\n情境五：HTTP 中介軟體管線');
const middlewareChain = new AuthMiddleware();
middlewareChain
  .setNext(new RoleMiddleware())
  .setNext(new LoggingMiddleware())
  .setNext(new HandlerMiddleware());
middlewareChain.handle(new HttpRequest('/admin', 'valid', 'admin'));
middlewareChain.handle(new HttpRequest('/admin', 'valid', 'guest'));
middlewareChain.handle(new HttpRequest('/admin', '', 'guest'));

// 情境六：客服分層
console.log('\n情境六：技術支援客服分層');
const supportChain = new FAQBotHandler();
supportChain
  .setNext(new Level1SupportHandler())
  .setNext(new Level2SupportHandler())
  .setNext(new SupportManagerHandler());
supportChain.handle(new SupportTicket('faq', '如何重設密碼'));
supportChain.handle(new SupportTicket('billing', '帳單有誤'));
supportChain.handle(new SupportTicket('technical', '系統當機'));
supportChain.handle(new SupportTicket('complaint', '我要投訴'));

// 情境七：動物食物
console.log('\n情境七：動物食物處理（概念範例）');
const animalChain = new MonkeyHandler();
animalChain
  .setNext(new SquirrelAnimalHandler())
  .setNext(new DogFoodHandler());
for (const food of ['Nut', 'Banana', 'Cup of coffee']) {
  console.log(`\nClient: Who wants a ${food}?`);
  animalChain.handle(food);
}

// 情境八：設備輪詢
console.log('\n情境八：設備輪詢處理（SNMP / IoT）');
const deviceChain = new SNMPHandlerDevice();
deviceChain.setNext(new IoTHandlerDevice());
deviceChain.handle(new SNMPDevice());
deviceChain.handle(new IoTDevicePoll());

export {};
