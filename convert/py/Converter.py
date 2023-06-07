import json
import xml.etree.ElementTree as ET

class Converter:
    def convert(self, data):
        pass

class JsonConverter(Converter):
    def convert(self, data):
        return json.dumps(data)

class XmlConverter(Converter):
    def convert(self, data):
        root = ET.Element("data")
        for key, value in data.items():
            node = ET.SubElement(root, key)
            node.text = str(value)
        return ET.tostring(root).decode()
    
    