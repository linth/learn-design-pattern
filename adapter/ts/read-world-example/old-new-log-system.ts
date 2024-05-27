/**
 * 新舊 logger
 *  - 在應用程式中, 你有一個已知的class, 但它的接口與其他程式碼不兼容, 可以應用adapter design pattern.
 *  - 在應用程式中, 有一個舊的日誌系統和新的日誌系統, 他們接口不同, 但你想要用新的日誌系統, 同時又不想改舊的程式碼。
 * 
 * 
 * Reference:
 *  - https://www.lumin.tech/blog/design-patterns-java-2-adapter/
 */

{
  class OldLooger {
    log(msg: string): void {
      console.log(`old logger: ${msg}`);
    }

    error(msg: string): void {
      console.error(`old logger error: ${msg}`);      
    }
  }

  class NewLogger {
    writeLog(msg: string): void {
      console.log(`new logger: ${msg}`);      
    }

    writeError(msg: string): void {
      console.error(`new logger error: ${msg}`);
    }
  }

  // 建立一個adapter class.
  class LoggerAdapter {
    private newLogger: NewLogger;

    constructor(newLogger: NewLogger) {
      this.newLogger = newLogger;
    }

    log(msg: string): void {
      this.newLogger.writeLog(msg);
    }

    error(msg: string): void {
      this.newLogger.writeError(msg);
    }
  }

  // 原本使用的舊日誌系統方式:
  const oldLogger = new OldLooger();
  oldLogger.log("This is a message from the old logger.");
  oldLogger.error("This is an error from the old logger.");

  // 使用adapter方式 with new logger.
  const newLogger = new NewLogger();
  const adapterLogger = new LoggerAdapter(newLogger);
  adapterLogger.log("This is a message using the new logger with adapter.");
  adapterLogger.error("This is an error using the new logger with adapter.");

  //[thinking] 使用adapter方式 with old logger?
}

