import { ILoggerStrategy } from "./ILoggerStrategy";

/**
 * Logging - Singleton + Strategy
 * 
 */
export class LoggerWithSingletonAndStrategy {
	private static instance: LoggerWithSingletonAndStrategy;
	private strategy: ILoggerStrategy;

	private constructor(strategy: ILoggerStrategy) {
		this.strategy = strategy;
	}

	static getInstance(strategy?: ILoggerStrategy): LoggerWithSingletonAndStrategy {
		if (!LoggerWithSingletonAndStrategy.instance && strategy) {
			LoggerWithSingletonAndStrategy.instance = new LoggerWithSingletonAndStrategy(strategy);
		}
		return LoggerWithSingletonAndStrategy.instance;
	}

	setStrategy(strategy: ILoggerStrategy) {
		this.strategy = strategy;
	}

	log(message: string) {
    this.strategy.log(message);
  }

  error(message: string) {
    this.strategy.error(message);
  }
}

