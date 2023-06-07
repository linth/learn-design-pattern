from Converter import JsonConverter, XmlConverter

class ConverterFactory:
    def create_converter(self, converter_type):
        if converter_type == "json":
            return JsonConverter()
        elif converter_type == "xml":
            return XmlConverter()
        else:
            raise ValueError("Invalid converter type.")
