/**
 * Singleton pattern in TypeScript for a real-world scenario.
 *  
 * 常見的範例: 設定檔案也會使用 singleton design pattern.
 * 
 * The Configuration class in the example I provided earlier also implements the Singleton pattern. 
 * The idea behind using the Singleton pattern in this case is to ensure that there is only one 
 * instance of the Configuration class throughout your application, and that any changes made to 
 * the configuration object are immediately reflected across the entire application. 
 * By using the Singleton pattern, you can ensure that any part of your application that 
 * needs to access the configuration can do so using the same instance of the Configuration class, 
 * thus preventing inconsistencies or conflicts that may arise if multiple instances of the Configuration class are used.
 * 
 */

class Configuration {
  private static instance: Configuration;

  private constructor(private apiUrl: string, private maxRetries: number, private timeout: number) {
    // Initialize configuration object with passed values
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration('https://example.com/api', 3, 5000);
    }

    return Configuration.instance;
  }

  // Getter methods for configuration properties
  public getApiUrl(): string {
    return this.apiUrl;
  }

  public getMaxRetries(): number {
    return this.maxRetries;
  }

  public getTimeout(): number {
    return this.timeout;
  }
}

{
  const config = Configuration.getInstance();
  console.log(config.getApiUrl()); // Output: 'https://example.com/api'
  console.log(config.getMaxRetries()); // Output: 3
  console.log(config.getTimeout()); // Output: 5000
}
