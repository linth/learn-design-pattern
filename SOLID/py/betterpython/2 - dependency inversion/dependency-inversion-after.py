'''
dependency inversion: (依賴反轉)
    - 增加 abc class
    - 如 class 需要使用其他 class，一般做法會使用 new object()。
      但是，最優解是使用abc class來取代，遵循使用介面方式來界接，減少程式擴增的修改。
    

Reference:
    - https://github.com/ArjanCodes/betterpython/tree/main/2%20-%20dependency%20inversion
'''
from abc import ABC, abstractmethod


# 最核心的部分為建置 abc class。
class Switchable(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass


class LightBulb(Switchable):
    def turn_on(self):
        print("LightBulb: turned on...")

    def turn_off(self):
        print("LightBulb: turned off...")


class Fan(Switchable):
    def turn_on(self):
        print("Fan: turned on...")

    def turn_off(self):
        print("Fan: turned off...")


# 差別在於都使用 abc class 來界接，這樣繼承下來的新 class 都可以被使用。
class ElectricPowerSwitch:
    def __init__(self, c: Switchable):
        self.client = c
        self.on = False

    def press(self):
        if self.on:
            self.client.turn_off()
            self.on = False
        else:
            self.client.turn_on()
            self.on = True


l = LightBulb()
f = Fan()
switch = ElectricPowerSwitch(f)
switch.press()
switch.press()
