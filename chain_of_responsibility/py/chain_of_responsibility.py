'''
Chain of Responsibility（責任鏈模式）
將請求沿著一條處理器鏈傳遞，每個處理器可決定是否處理請求
或將請求傳遞給下一個處理器。
'''
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any, Optional


class AbstractHandler(ABC):
    '''
    抽象處理器：責任鏈的基底類別
    '''

    def __init__(self):
        self._next_handler: Optional[AbstractHandler] = None

    def set_next(self, handler: AbstractHandler) -> AbstractHandler:
        self._next_handler = handler
        return handler

    @abstractmethod
    def handle(self, request: Any):
        pass


class BaseHandler(AbstractHandler):
    '''帶有預設傳遞行為的基底處理器'''

    def handle(self, request: Any):
        if self._next_handler:
            self._next_handler.handle(request)


# ============================================================
# 情境一：請假審批流程
# ============================================================

class LeaveRequest:
    def __init__(self, days: int):
        self.days = days


class TeamLeadHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LeaveRequest) and request.days <= 3:
            print(f'[組長] 核准 {request.days} 天請假')
        else:
            super().handle(request)


class ManagerLeaveHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LeaveRequest) and request.days <= 7:
            print(f'[經理] 核准 {request.days} 天請假')
        else:
            super().handle(request)


class DirectorLeaveHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LeaveRequest) and request.days <= 15:
            print(f'[總監] 核准 {request.days} 天請假')
        else:
            super().handle(request)


class CEOLeaveHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LeaveRequest):
            print(f'[CEO] 核准 {request.days} 天請假（特批）')


# ============================================================
# 情境二：轉帳風控驗證
# ============================================================

class TransferRequest:
    def __init__(self, money: float):
        self.money = money


class FirstRiskControlHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, TransferRequest) and request.money <= 1000:
            print(f'[初級風控] 簡單轉帳 ${request.money} 完成')
        else:
            super().handle(request)


class SecondRiskControlHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, TransferRequest) and request.money <= 10000:
            print(f'[中級風控] 簡訊驗證轉帳 ${request.money} 完成')
        else:
            super().handle(request)


class ThirdRiskControlHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, TransferRequest):
            print(f'[高級風控] 人臉辨識轉帳 ${request.money} 完成')


# ============================================================
# 情境三：優惠券處理系統
# ============================================================

class CouponRequest:
    def __init__(self, code: str, amount: float):
        self.code = code
        self.amount = amount


class DiscountCouponHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, CouponRequest) and request.code.startswith('DISCOUNT'):
            print(f'[折扣券] 套用折扣券 {request.code}')
        else:
            super().handle(request)


class ThresholdCouponHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, CouponRequest) and request.code.startswith('THRESHOLD'):
            print(f'[滿減券] 套用滿減券 {request.code}')
        else:
            super().handle(request)


class FreeShippingCouponHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, CouponRequest) and request.code.startswith('FREESHIP'):
            print(f'[免運券] 套用免運券 {request.code}')
        else:
            super().handle(request)


# ============================================================
# 情境四：日誌層級處理
# ============================================================

class LogEntry:
    def __init__(self, level: str, message: str):
        self.level = level
        self.message = message


class DebugLogHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LogEntry) and request.level == 'DEBUG':
            print(f'[DEBUG] 寫入詳細日誌: {request.message}')
        else:
            super().handle(request)


class InfoLogHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LogEntry) and request.level == 'INFO':
            print(f'[INFO] 寫入一般日誌: {request.message}')
        else:
            super().handle(request)


class WarnLogHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LogEntry) and request.level == 'WARN':
            print(f'[WARN] 發送警報: {request.message}')
        else:
            super().handle(request)


class ErrorLogHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, LogEntry) and request.level == 'ERROR':
            print(f'[ERROR] 發送郵件通知: {request.message}')
        else:
            super().handle(request)


# ============================================================
# 情境五：HTTP 中介軟體管線
# ============================================================

class HttpRequest:
    def __init__(self, path: str, token: str, role: str):
        self.path = path
        self.token = token
        self.role = role


class AuthMiddleware(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, HttpRequest) and not request.token:
            print('[驗證] 拒絕：未提供 Token')
        else:
            super().handle(request)


class RoleMiddleware(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, HttpRequest) and request.role != 'admin':
            print(f"[授權] 拒絕：角色 '{request.role}' 無權限")
        else:
            super().handle(request)


class LoggingMiddleware(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, HttpRequest):
            print(f'[記錄] {request.role} 請求 {request.path}')
        super().handle(request)


class HandlerMiddleware(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, HttpRequest):
            print(f'[處理] 執行 {request.path} 處理器')


# ============================================================
# 情境六：技術支援客服分層
# ============================================================

class SupportTicket:
    def __init__(self, category: str, description: str):
        self.category = category
        self.description = description


class FAQBotHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, SupportTicket) and request.category == 'faq':
            print(f'[FAQ機器人] 自動回覆: {request.description}')
        else:
            super().handle(request)


class Level1SupportHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, SupportTicket) and request.category in ('billing', 'account'):
            print(f'[一線客服] 處理: {request.description}')
        else:
            super().handle(request)


class Level2SupportHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, SupportTicket) and request.category == 'technical':
            print(f'[二線客服] 處理: {request.description}')
        else:
            super().handle(request)


class SupportManagerHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, SupportTicket):
            print(f'[主管] 處理客訴: {request.description}')


# ============================================================
# 情境七：動物食物處理（概念範例）
# ============================================================

class MonkeyHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, str) and request == 'Banana':
            print(f"Monkey: I'll eat the {request}")
        else:
            super().handle(request)


class SquirrelAnimalHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, str) and request == 'Nut':
            print(f"Squirrel: I'll eat the {request}")
        else:
            super().handle(request)


class DogFoodHandler(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, str) and request == 'MeatBall':
            print(f"Dog: I'll eat the {request}")
        else:
            super().handle(request)


# ============================================================
# 情境八：設備輪詢處理（SNMP / IoT）
# ============================================================

class Device(ABC):
    @abstractmethod
    def poll(self):
        pass


class SNMPDevice(Device):
    def poll(self):
        print('Polling SNMP device...')


class IoTDevicePoll(Device):
    def poll(self):
        print('Polling IoT device...')


class SNMPHandlerDevice(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, SNMPDevice):
            request.poll()
        else:
            super().handle(request)


class IoTHandlerDevice(BaseHandler):
    def handle(self, request: Any):
        if isinstance(request, IoTDevicePoll):
            request.poll()
        else:
            super().handle(request)


if __name__ == '__main__':
    print('============================================================')
    print('Chain of Responsibility 責任鏈模式 範例')
    print('============================================================')

    # 情境一：請假審批
    print('\n情境一：請假審批流程')
    leave_chain = TeamLeadHandler()
    leave_chain \
        .set_next(ManagerLeaveHandler()) \
        .set_next(DirectorLeaveHandler()) \
        .set_next(CEOLeaveHandler())
    leave_chain.handle(LeaveRequest(2))
    leave_chain.handle(LeaveRequest(10))
    leave_chain.handle(LeaveRequest(20))

    # 情境二：轉帳風控
    print('\n情境二：轉帳風控驗證')
    risk_chain = FirstRiskControlHandler()
    risk_chain \
        .set_next(SecondRiskControlHandler()) \
        .set_next(ThirdRiskControlHandler())
    risk_chain.handle(TransferRequest(500))
    risk_chain.handle(TransferRequest(5000))
    risk_chain.handle(TransferRequest(50000))

    # 情境三：優惠券處理
    print('\n情境三：優惠券處理系統')
    coupon_chain = DiscountCouponHandler()
    coupon_chain \
        .set_next(ThresholdCouponHandler()) \
        .set_next(FreeShippingCouponHandler())
    coupon_chain.handle(CouponRequest('DISCOUNT123', 100))
    coupon_chain.handle(CouponRequest('THRESHOLD456', 200))
    coupon_chain.handle(CouponRequest('FREESHIP789', 0))

    # 情境四：日誌層級
    print('\n情境四：日誌層級處理')
    log_chain = DebugLogHandler()
    log_chain \
        .set_next(InfoLogHandler()) \
        .set_next(WarnLogHandler()) \
        .set_next(ErrorLogHandler())
    log_chain.handle(LogEntry('DEBUG', '系統啟動中'))
    log_chain.handle(LogEntry('WARN', '磁碟空間不足'))
    log_chain.handle(LogEntry('ERROR', '資料庫連線失敗'))

    # 情境五：中介軟體
    print('\n情境五：HTTP 中介軟體管線')
    middleware_chain = AuthMiddleware()
    middleware_chain \
        .set_next(RoleMiddleware()) \
        .set_next(LoggingMiddleware()) \
        .set_next(HandlerMiddleware())
    middleware_chain.handle(HttpRequest('/admin', 'valid', 'admin'))
    middleware_chain.handle(HttpRequest('/admin', 'valid', 'guest'))
    middleware_chain.handle(HttpRequest('/admin', '', 'guest'))

    # 情境六：客服分層
    print('\n情境六：技術支援客服分層')
    support_chain = FAQBotHandler()
    support_chain \
        .set_next(Level1SupportHandler()) \
        .set_next(Level2SupportHandler()) \
        .set_next(SupportManagerHandler())
    support_chain.handle(SupportTicket('faq', '如何重設密碼'))
    support_chain.handle(SupportTicket('billing', '帳單有誤'))
    support_chain.handle(SupportTicket('technical', '系統當機'))
    support_chain.handle(SupportTicket('complaint', '我要投訴'))

    # 情境七：動物食物
    print('\n情境七：動物食物處理（概念範例）')
    animal_chain = MonkeyHandler()
    animal_chain \
        .set_next(SquirrelAnimalHandler()) \
        .set_next(DogFoodHandler())
    for food in ['Nut', 'Banana', 'Cup of coffee']:
        print(f'\nClient: Who wants a {food}?')
        animal_chain.handle(food)

    # 情境八：設備輪詢
    print('\n情境八：設備輪詢處理（SNMP / IoT）')
    device_chain = SNMPHandlerDevice()
    device_chain.set_next(IoTHandlerDevice())
    device_chain.handle(SNMPDevice())
    device_chain.handle(IoTDevicePoll())
