/**
 * Singleton simple example.
 * 
 * Reference:
 *  - https://fireship.io/lessons/typescript-design-patterns/
 */

class Settings {
  static instance: Settings; 
  public readonly mode = 'dark';

  // prevent new with private constructor
  private constructor() {

  }

  static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}


{
  // Settings class就是不給人使用new class.
  // const settings = new Settings(); // throws error

  const settings = Settings.getInstance();
  console.log(settings);  
}

