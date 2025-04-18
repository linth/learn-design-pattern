
export interface ILoggerStrategy {
	log(message: string): void;
	error(message: string): void;
}