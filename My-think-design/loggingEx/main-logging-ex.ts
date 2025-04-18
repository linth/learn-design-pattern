/**
 * 
 */
// const logger = LoggerWithSingletonAndStrategy.getInstance(new ConsoleLogger());

import { ConsoleLogger } from "./ConsoleLogger";
import { FileLogger } from "./FileLogger";
import { LoggerWithSingletonAndStrategy } from "./LoggerWithSingletonAndStrategy";

function main() {
	const logger = LoggerWithSingletonAndStrategy.getInstance(new ConsoleLogger());

	logger.log('Hello Console Logger');
	logger.error('Oops Console');

	logger.setStrategy(new FileLogger());
	logger.log('Hello File Logger');
	logger.error('Oops File');
}


main();