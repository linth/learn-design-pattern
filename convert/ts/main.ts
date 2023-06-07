import { ConverterFactory } from "./ConverterFactory";
import { IConverter } from "./IConverter";

const data = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};

const factory = new ConverterFactory();

const jsonConverter: IConverter = factory.createConverter("json");
const jsonResult = jsonConverter.convert(data);

const xmlConverter: IConverter = factory.createConverter("xml");
const xmlResult = xmlConverter.convert(data);

console.log("JSON data:");
console.log(jsonResult);

console.log("XML data:");
console.log(xmlResult);
