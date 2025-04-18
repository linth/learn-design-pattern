import { ILoggerStrategy } from "./ILoggerStrategy";

/**
 * FileLogger
 * 
 */
export class FileLogger implements ILoggerStrategy {
	log(message: string): void {
    // 模擬寫檔
    console.log(`[FILE] Write log: ${message}`);
  }

  error(message: string): void {
    console.log(`[FILE] Write error: ${message}`);
  }
}

