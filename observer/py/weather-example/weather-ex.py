'''
Observer design pattern - Weather example.

  - 抽象主題 (Subject)
  - 抽象觀察者 (Observer)
  - 具體主題：天氣站
  - 具體觀察者：當前天氣顯示器

具體主題/觀察者繼承於抽象

=> Subject <- WeatherStation
=> Observer <- CurrentConditionsDisplay, ForecastDisplay
'''
from abc import ABC, abstractmethod

# 抽象主題 (Subject)
class Subject(ABC):
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        try:
            self._observers.remove(observer)
        except ValueError:
            pass

    def notify(self):
        for observer in self._observers:
            observer.update(self)

# 抽象觀察者 (Observer)
class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass

# 具體主題：天氣站
class WeatherStation(Subject):
    def __init__(self):
        super().__init__()
        self._temperature = 0
        self._humidity = 0
        self._pressure = 0

    def set_measurements(self, temperature, humidity, pressure):
        self._temperature = temperature
        self._humidity = humidity
        self._pressure = pressure
        self.measurements_changed()

    def measurements_changed(self):
        self.notify()

    def get_temperature(self):
        return self._temperature

    def get_humidity(self):
        return self._humidity

    def get_pressure(self):
        return self._pressure

# 具體觀察者：當前天氣顯示器
class CurrentConditionsDisplay(Observer):
    def __init__(self, weather_station):
        self._weather_station = weather_station
        self._temperature = 0
        self._humidity = 0
        weather_station.attach(self)

    def update(self, subject):
        if isinstance(subject, WeatherStation):
            self._temperature = subject.get_temperature()
            self._humidity = subject.get_humidity()
            self.display()

    def display(self):
        print(f"當前天氣：溫度 {self._temperature}°C, 濕度 {self._humidity}%")

# 具體觀察者：天氣預報顯示器
class ForecastDisplay(Observer):
    def __init__(self, weather_station):
        self._weather_station = weather_station
        self._current_pressure = 0
        self._last_pressure = 0
        weather_station.attach(self)

    def update(self, subject):
        if isinstance(subject, WeatherStation):
            self._last_pressure = self._current_pressure
            self._current_pressure = subject.get_pressure()
            self.display()

    def display(self):
        print("天氣預報：", end="")
        if self._current_pressure > self._last_pressure:
            print("天氣正在改善！")
        elif self._current_pressure == self._last_pressure:
            print("天氣保持不變。")
        else:
            print("天氣可能會惡化。")

# 客戶端程式碼
if __name__ == "__main__":
    weather_station = WeatherStation()

    current_display = CurrentConditionsDisplay(weather_station)
    forecast_display = ForecastDisplay(weather_station)

    print("\n第一次測量：")
    weather_station.set_measurements(25, 65, 1020)

    print("\n第二次測量：")
    weather_station.set_measurements(28, 70, 1010)

    print("\n移除當前天氣顯示器，進行第三次測量：")
    weather_station.detach(current_display)
    weather_station.set_measurements(22, 90, 1000)