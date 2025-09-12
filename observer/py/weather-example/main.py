from w.weatherStation import WeatherStation
from w.currentConditionsDisplay import CurrentConditionsDisplay
from w.forecastDisplay import ForecastDisplay


# 客戶端程式碼
if __name__ == "__main__":
    # weather
    weather_station = WeatherStation()

    # build two observer objects.
    current_display = CurrentConditionsDisplay(weather_station)
    forecast_display = ForecastDisplay(weather_station)

    # weather(subject) -setup-> notify (通知主題 subject)
    # current, forecast(observer), 在裡面放入weather(subject) -> update -> display 
    print("\n第一次測量：")
    weather_station.set_measurements(25, 65, 1020)

    print("\n第二次測量：")
    weather_station.set_measurements(28, 70, 1010)

    print("\n移除當前天氣顯示器，進行第三次測量：")
    weather_station.detach(current_display)
    weather_station.set_measurements(22, 90, 1000)