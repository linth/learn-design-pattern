from w.observer import Observer
from w.weatherStation import WeatherStation


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
