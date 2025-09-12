from w.observer import Observer
from w.weatherStation import WeatherStation


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
