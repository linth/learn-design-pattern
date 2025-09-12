from abc import ABC, abstractmethod
import time
import random

# 抽象主題 (Subject)
class StreetLightController(ABC):
    """路燈控制器抽象主題，定義了管理觀察者和通知觀察者的方法。"""
    def __init__(self, light_id):
        self._light_id = light_id
        self._status = "OFF"  # OFF, ON, FAULT
        self._brightness = 0  # 0-100
        self._observers = []

    def attach(self, observer):
        """添加一個觀察者。"""
        if observer not in self._observers:
            self._observers.append(observer)
            print(f"[路燈 {self._light_id}] 添加監控服務: {observer.name}")

    def detach(self, observer):
        """移除一個觀察者。"""
        try:
            self._observers.remove(observer)
            print(f"[路燈 {self._light_id}] 移除監控服務: {observer.name}")
        except ValueError:
            pass

    def notify(self):
        """通知所有註冊的觀察者。"""
        print(f"\n[路燈 {self._light_id}] 狀態更新，通知所有監控服務...")
        for observer in self._observers:
            observer.update(self)

    @property
    def light_id(self):
        return self._light_id

    @property
    def status(self):
        return self._status

    @property
    def brightness(self):
        return self._brightness

    @abstractmethod
    def turn_on(self, brightness=100):
        """開啟路燈。"""
        pass

    @abstractmethod
    def turn_off(self):
        """關閉路燈。"""
        pass

    @abstractmethod
    def set_brightness(self, brightness):
        """設定路燈亮度。"""
        pass

    @abstractmethod
    def simulate_fault(self):
        """模擬路燈故障。"""
        pass

# 抽象觀察者 (Observer)
class MonitoringSystem(ABC):
    """監控系統抽象觀察者，定義了接收更新的方法。"""
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @abstractmethod
    def update(self, subject: StreetLightController):
        """當主題狀態改變時被呼叫。"""
        pass

# 具體主題 (Concrete Subject)
class ConcreteStreetLightController(StreetLightController):
    """具體路燈控制器，管理其狀態並在狀態變化時通知觀察者。"""
    def turn_on(self, brightness=100):
        if self._status != "ON" or self._brightness != brightness:
            self._status = "ON"
            self._brightness = max(0, min(100, brightness))
            print(f"[路燈 {self._light_id}] 狀態變更: 開啟, 亮度 {self._brightness}%")
            self.notify()

    def turn_off(self):
        if self._status != "OFF":
            self._status = "OFF"
            self._brightness = 0
            print(f"[路燈 {self._light_id}] 狀態變更: 關閉")
            self.notify()

    def set_brightness(self, brightness):
        new_brightness = max(0, min(100, brightness))
        if self._status == "ON" and self._brightness != new_brightness:
            self._brightness = new_brightness
            print(f"[路燈 {self._light_id}] 亮度變更: {self._brightness}%")
            self.notify()
        elif self._status == "OFF":
            print(f"[路燈 {self._light_id}] 路燈已關閉，無法設定亮度。")
        elif self._status == "FAULT":
            print(f"[路燈 {self._light_id}] 路燈故障中，無法設定亮度。")

    def simulate_fault(self):
        if self._status != "FAULT":
            self._status = "FAULT"
            self._brightness = 0
            print(f"[路燈 {self._light_id}] 狀態變更: 故障！")
            self.notify()

# 具體觀察者 (Concrete Observer)
class DashboardDisplay(MonitoringSystem):
    """儀表板顯示服務，顯示路燈的即時狀態。"""
    def __init__(self, name="儀表板顯示"): # Assign a default name
        super().__init__(name)

    def update(self, subject: StreetLightController):
        print(f"  [{self.name}] 收到路燈 {subject.light_id} 更新: 狀態={subject.status}, 亮度={subject.brightness}%")
        if subject.status == "FAULT":
            print(f"  [{self.name}] 警告: 路燈 {subject.light_id} 發生故障！")

class AlertSystem(MonitoringSystem):
    """警報系統，在路燈發生故障時發送警報。"""
    def __init__(self, name="警報系統"): # Assign a default name
        super().__init__(name)

    def update(self, subject: StreetLightController):
        if subject.status == "FAULT":
            print(f"  [{self.name}] !!! 緊急警報 !!! 路燈 {subject.light_id} 故障，請立即處理！")
        elif subject.status == "OFF" and subject.brightness == 0:
            print(f"  [{self.name}] 通知: 路燈 {subject.light_id} 已關閉。")

class LoggingService(MonitoringSystem):
    """日誌服務，記錄路燈的所有狀態變化。"""
    def __init__(self, name="日誌服務"): # Assign a default name
        super().__init__(name)

    def update(self, subject: StreetLightController):
        print(f"  [{self.name}] 記錄: 路燈 {subject.light_id} 狀態從 {subject.status} 變更，亮度 {subject.brightness}%")

# --- 範例使用 --- #
if __name__ == "__main__":
    print("===== IoT 路燈控制器監控平台 Observer 模式範例 =====\n")

    # 1. 創建多個路燈控制器 (主題)
    light_controller_A = ConcreteStreetLightController("SL-001")
    light_controller_B = ConcreteStreetLightController("SL-002")
    light_controller_C = ConcreteStreetLightController("SL-003")

    # 2. 創建多個監控服務 (觀察者)
    dashboard = DashboardDisplay()
    alert_system = AlertSystem()
    logging_service = LoggingService()

    # 3. 監控服務訂閱感興趣的路燈
    # 儀表板監控所有路燈
    light_controller_A.attach(dashboard)
    light_controller_B.attach(dashboard)
    light_controller_C.attach(dashboard)

    # 警報系統只監控 SL-001 和 SL-003 的故障
    light_controller_A.attach(alert_system)
    light_controller_C.attach(alert_system)

    # 日誌服務監控所有路燈
    light_controller_A.attach(logging_service)
    light_controller_B.attach(logging_service)
    light_controller_C.attach(logging_service)

    print("\n--- 模擬路燈操作與狀態變化 ---")

    print("\n--- 路燈 SL-001 開啟 ---")
    light_controller_A.turn_on(80)
    time.sleep(0.5)

    print("\n--- 路燈 SL-002 開啟並調整亮度 ---")
    light_controller_B.turn_on(50)
    time.sleep(0.5)
    light_controller_B.set_brightness(75)
    time.sleep(0.5)

    print("\n--- 路燈 SL-003 模擬故障 ---")
    light_controller_C.simulate_fault()
    time.sleep(0.5)

    print("\n--- 路燈 SL-001 調整亮度 ---")
    light_controller_A.set_brightness(100)
    time.sleep(0.5)

    print("\n--- 路燈 SL-002 關閉 ---")
    light_controller_B.turn_off()
    time.sleep(0.5)

    print("\n--- 警報系統不再監控 SL-003 ---")
    light_controller_C.detach(alert_system)

    print("\n--- 路燈 SL-003 故障排除 (假設修復後重新開啟) ---")
    # 實際中故障排除可能需要額外邏輯，這裡簡化為直接開啟
    light_controller_C.turn_on(90)
    time.sleep(0.5)

    print("\n===== 範例結束 =====")