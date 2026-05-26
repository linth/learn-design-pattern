/**
 * 獨體模式 - 日誌記錄器真實案例
 * 整個應用系統只需一個日誌實例，避免重複開啟檔案與資源浪費。
 */

{
  enum LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    FATAL,
  }

  class Logger {
    private static _instance: Logger | null = null;

    private constructor() {}

    /** 取得唯一的 Logger 實例 */
    static getInstance(): Logger {
      if (!Logger._instance) {
        Logger._instance = new Logger();
      }
      return Logger._instance;
    }

    /** 輸出日誌 */
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
  logger.debug('這是一條除錯訊息');
  logger.info('應用程式已啟動');
  logger.warning('記憶體使用量偏高');
  logger.error('資料庫連線逾時');
  logger.fatal('系統無法恢復，即將關閉');
}
