import { IConverter } from "./IConverter";
import { JsonConverter } from "./JsonConverter";
import { XmlConverter } from "./XmlConverter";

export class ConverterFactory {
  createConverter(converterType: string): IConverter {
    switch (converterType.toLowerCase()) {
      case "json":
        return new JsonConverter();
      case "xml":
        return new XmlConverter();
      default:
        throw new Error("Invalid converter type.");
    }
  }
}
