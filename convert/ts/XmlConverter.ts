import { IConverter } from "./IConverter";

export class XmlConverter implements IConverter {
  convert(data: any): string {
    let xml = "<data>";
    for (const [key, value] of Object.entries(data)) {
      xml += `<${key}>${value}</${key}>`;
    }
    xml += "</data>";
    return xml;
  }
}
