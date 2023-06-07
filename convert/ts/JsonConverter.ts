import { IConverter } from "./IConverter";

export class JsonConverter implements IConverter {
  convert(data: any): string {
    return JSON.stringify(data);
  }
}
