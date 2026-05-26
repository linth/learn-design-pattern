'''
狀態模式 (State Design Pattern)

核心概念：
1. 允許物件在內部狀態改變時改變其行為，彷彿換了一個類別。
2. 將每個狀態的邏輯封裝到獨立的類別中，避免大量 if-else。
3. 狀態之間的轉換由狀態類別自行管理。
'''

from abc import ABC, abstractmethod


# ============================================================
# 範例一：訂單系統
# ============================================================

class Order:
    '''
    [環境類別 Context] 訂單，持有當前狀態。
    所有訂單操作皆委託給當前狀態物件處理。
    '''

    def __init__(self):
        self._state: 'OrderState' = NewState(self)

    def set_state(self, state: 'OrderState') -> None:
        '''切換訂單狀態'''
        self._state = state

    def pay(self) -> None:
        self._state.pay()

    def ship(self) -> None:
        self._state.ship()

    def deliver(self) -> None:
        self._state.deliver()

    def cancel(self) -> None:
        self._state.cancel()


class OrderState(ABC):
    '''[狀態介面] 訂單狀態的統一規範'''

    def __init__(self, order: Order):
        self._order = order

    def pay(self) -> None:
        print('❌ 付款失敗：目前狀態不允許此操作。')

    def ship(self) -> None:
        print('❌ 出貨失敗：目前狀態不允許此操作。')

    def deliver(self) -> None:
        print('❌ 送達失敗：目前狀態不允許此操作。')

    def cancel(self) -> None:
        print('❌ 取消失敗：目前狀態不允許此操作。')


class NewState(OrderState):
    '''新訂單：可付款或取消'''

    def pay(self) -> None:
        print('✅ 付款成功。')
        self._order.set_state(PaidState(self._order))

    def cancel(self) -> None:
        print('✅ 訂單已取消。')
        self._order.set_state(CancelledState(self._order))


class PaidState(OrderState):
    '''已付款：可出貨或取消（需退款）'''

    def ship(self) -> None:
        print('✅ 已出貨。')
        self._order.set_state(ShippedState(self._order))

    def cancel(self) -> None:
        print('✅ 訂單已取消，正在退款...')
        self._order.set_state(CancelledState(self._order))


class ShippedState(OrderState):
    '''已出貨：只能送達'''

    def deliver(self) -> None:
        print('✅ 訂單已送達。')
        self._order.set_state(DeliveredState(self._order))


class DeliveredState(OrderState):
    '''已送達：最終狀態，不允許任何操作'''

    def __init__(self, order: Order):
        super().__init__(order)
        print('ℹ️ 訂單已送達（最終狀態）。')


class CancelledState(OrderState):
    '''已取消：最終狀態，不允許任何操作'''

    def __init__(self, order: Order):
        super().__init__(order)
        print('ℹ️ 訂單已取消（最終狀態）。')


# ============================================================
# 範例二：紅綠燈
# ============================================================

class TrafficLightState(ABC):
    '''[狀態介面] 紅綠燈狀態'''

    @abstractmethod
    def change(self, light: 'TrafficLight') -> None:
        pass


class TrafficLight:
    '''[環境類別] 紅綠燈，持有當前燈號狀態'''

    def __init__(self):
        self.state: TrafficLightState = RedLight()

    def change(self) -> None:
        self.state.change(self)


class RedLight(TrafficLightState):
    def change(self, light: TrafficLight) -> None:
        print('🔴 紅燈：停止')
        light.state = GreenLight()


class GreenLight(TrafficLightState):
    def change(self, light: TrafficLight) -> None:
        print('🟢 綠燈：前進')
        light.state = YellowLight()


class YellowLight(TrafficLightState):
    def change(self, light: TrafficLight) -> None:
        print('🟡 黃燈：準備停止')
        light.state = RedLight()


# ============================================================
# 使用範例
# ============================================================

if __name__ == '__main__':
    # 訂單標準流程
    print('=== 情境一：訂單標準流程 ===')
    order1 = Order()
    order1.pay()
    order1.ship()
    order1.deliver()
    print('\n嘗試送達後再次付款：')
    order1.pay()  # 應失敗

    # 訂單取消流程
    print('\n=== 情境二：取消流程 ===')
    order2 = Order()
    order2.pay()
    print('決定取消訂單...')
    order2.cancel()
    print('\n嘗試在取消後出貨：')
    order2.ship()  # 應失敗

    # 不允許的操作
    print('\n=== 情境三：不允許的操作 ===')
    order3 = Order()
    print('嘗試直接出貨（未付款）：')
    order3.ship()  # 應失敗

    # 紅綠燈
    print('\n=== 情境四：紅綠燈 ===')
    light = TrafficLight()
    for _ in range(3):
        light.change()
