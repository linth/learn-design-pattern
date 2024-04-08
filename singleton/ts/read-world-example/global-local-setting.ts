/**
 * Singleton simple example.
 * 
 * Reference:
 *  - https://fireship.io/lessons/typescript-design-patterns/
 */


{
  // 全域設定
  class GlobalSettings {
    private static instance: GlobalSettings | null = null;
    public mode: string = 'dark';
    public power: string = 'off';

    private constructor() {}

    static getInstance(): GlobalSettings {
      if (!GlobalSettings.instance) {
        GlobalSettings.instance = new GlobalSettings();
      }
      return GlobalSettings.instance;
    }

    powerOn(): void {
      this.power = 'on';
    }

    powerOff(): void {
      this.power = 'off';
    }

    changeMode(mode: string): void {
      this.mode = mode; // dark, white, ..., and so on.
    }
  }

  // 區域設定
  class LocalSettings {
    static instance: LocalSettings; 
    fontSize: number = 12;
    fontType: string = 'common'; // common, Futura, Helvetica, Adobe Garamond
  
    // prevent new with private constructor
    private constructor() {}
  
    static getInstance(): LocalSettings {
      if (!LocalSettings.instance) {
        LocalSettings.instance = new LocalSettings();
      }
      return LocalSettings.instance;
    }

    setFontSize(size: number): void {
      this.fontSize = size;
    }

    setFontType(fontType: string): void {
      this.fontType = fontType;
    }
  }


  // Settings class就是不給人使用new class. (Gloabl setting, Local setting.)
  // const settings = new Settings(); // throws error

  const gs = GlobalSettings.getInstance();
  const ls = LocalSettings.getInstance();

  console.log(`=== the information of global setting: ===`);
  console.log(`Mode: ${gs.mode}, Power: ${gs.power}`);

  console.log();
  
  console.log(`=== the information of local setting: ===`);
  console.log(`Font size: ${ls.fontSize}, Font type: ${ls.fontType}`);
}

