/**
 * 獨體模式 (Singleton Pattern) - 日誌記錄器
 * 整個應用程式共用一個日誌實例，確保輸出一致。
 */

{
  enum Level {
    TRACE, // 追蹤
    DEBUG, // 除錯
    INFO, // 資訊
    WARN, // 警告
    ERROR, // 錯誤
  }

  class Logging {
    private static instance: Logging | null = null;
    public level: Level; // 日誌等級
    public context: string; // 記錄來源（模組或類別名）
    public message: string; // 日誌訊息
    public timestamp: Date; // 日誌時間戳記

    constructor(level: Level, message: string, context?: string) {
      this.level = level;
      this.message = message;
      this.context = context ?? '';
      this.timestamp = new Date();
    }

    /** 取得唯一的日誌實例 */
    public static getInstance(): Logging {
      if (!Logging.instance) {
        Logging.instance = new Logging(Level.INFO, '預設訊息');
      }
      return Logging.instance;
    }

    /** 輸出日誌 */
    public log(level: Level, message: string, context?: string): void {
      this.level = level;
      this.message = message;
      this.context = context ?? '';
      this.timestamp = new Date();
      console.log(
        `[${Level[this.level]}] ${this.timestamp.toISOString()} - ${this.context}: ${this.message}`,
      );
    }
  }

  // 使用 Singleton 日誌
  const logger = Logging.getInstance();
  logger.log(Level.INFO, '這是一條資訊', 'App');
  logger.log(Level.WARN, '記憶體使用量偏高', 'Database');

  // 驗證是同一個實例
  const logger2 = Logging.getInstance();
  console.log(`同一個實例？${logger === logger2}`); // true
}
