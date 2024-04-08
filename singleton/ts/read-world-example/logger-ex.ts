/**
 * 日誌記錄器, Logger with singleton design pattern.
 * 
 */


{
  enum LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    FATAL
  }

  class Logger {
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