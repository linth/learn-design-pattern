import { ILoggerStrategy } from "./ILoggerStrategy";

/**
 * ConsoleLogger
 * 
 */
export class ConsoleLogger implements ILoggerStrategy {
	log(message: string): void {
		console.log(`[LOG] ${message}`);
	}

	error(message: string): void {
		console.error(`[ERROR] ${message}`);
	}
}