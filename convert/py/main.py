"""
為了定義通用資料轉換的介面，我們可以使用一個設計模式稱為「轉換器模式」（Converter Pattern）。
轉換器模式提供一個標準的介面，讓開發者可以方便地轉換不同的資料格式。它將資料轉換的功能分離出來，並使用一個中介介面（即轉換器）來實現資料轉換。此外，轉換器模式還允許開發者可以添加自己的轉換器來滿足特定需求。

類似地，我們可以定義其他資料格式的轉換器，例如 JSON、XML 等等。這些轉換器可以透過相同的介面來實現，這樣開發者就可以方便地將不同的資料格式進行轉換。
最後，我們可以將這些轉換器包裝成一個統一的介面，提供給開發者使用。例如，我們可以定義一個轉換器工廠（Converter Factory），讓開發者可以通過工廠來獲取不同的轉換器

透過這種設計，開發者可以方便地獲取不同的轉換器，並使用相同的介面來進行資料轉換，從而提高開發效率和程式碼的可維護性。同時，使用工廠模式可以讓開發者更輕鬆地新增和刪除轉換器，從而滿足不同的需求。
為了保證轉換器的質量，我們可以使用單元測試和集成測試來進行測試。單元測試可以驗證單個轉換器的功能是否正常，而集成測試可以驗證不同轉換器之間的兼容性和整體效能。
此外，我們還可以使用靜態分析工具和代碼審查等技術來檢測潛在的程式碼問題，從而提高程式碼的質量和可靠性。
總的來說，使用轉換器模式和工廠模式可以提高資料轉換的效率和可維護性，並且通過測試和代碼審查等技術可以確保程式碼的質量和可靠性。
"""
from ConverterFactory import ConverterFactory


if __name__ == '__main__':
    data = {
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com"
    }

    factory = ConverterFactory()

    json_converter = factory.create_converter("json")
    json_data = json_converter.convert(data)

    xml_converter = factory.create_converter("xml")
    xml_data = xml_converter.convert(data)

    print("JSON data:")
    print(json_data)

    print("XML data:")
    print(xml_data)
