/**
 * 日誌記錄器, Logger with singleton design pattern.
 * 
 */


{
  enum LogLevel {
    // 日誌等級
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    FATAL
  }

  class Logger {
    /**
     * private：表示此屬性為私有的，僅能在 Logger 類別內部存取，外部無法直接讀寫。
     * static：表示此屬性是類別層級的（class-level），而非實例層級。也就是說，這個變數會被 Logger 類別本身共享，而不是每個 Logger 實例都擁有一份。
     * _instance：是用來儲存 Logger 類別唯一實例的變數，依照 Singleton（單例）設計模式的慣例，通常用底線 _ 開頭表示私有變數。
     * Logger | null：代表型別是 Logger 或 null。初始化為 null，表示目前尚未建立 Logger 實例。
     * = null：賦予初始值為 null，代表一開始沒有實例。
     */
    private static _instance: Logger | null = null;

    private constructor() {}

    static getInstance(): Logger {
      if (!Logger._instance) {
        Logger._instance = new Logger();
      }
      return Logger._instance;
    }

    // TODO: 後續可以新增顏色!
    log(level: LogLevel, message: string): void {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${LogLevel[level]}] ${message}`);
    }

    debug(message: string): void {
      this.log(LogLevel.DEBUG, message);
    }

    info(message: string): void {
      this.log(LogLevel.INFO, message);
    }

    warning(message: string): void {
      this.log(LogLevel.WARNING, message);
    }

    error(message: string): void {
      this.log(LogLevel.ERROR, message);
    }

    fatal(message: string): void {
      this.log(LogLevel.FATAL, message);
    }
  }

  const logger = Logger.getInstance();
  logger.debug("This is a debug message");
  logger.info("This is an info message");
  logger.warning("This is a warning message");
  logger.error("This is an error message");
  logger.fatal("This is a fatal message");
}