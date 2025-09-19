/**
 * Singleton 基本範例
 */


{
  class Singleton {
    private static instance: Singleton | null = null;

    constructor() {}

    // 獲取 new 出來的 instance.
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      } 
      return Singleton.instance;
    }

    public someMethod(): void {
      console.log('Singleton method called.');
    }
  }

  const s1 = new Singleton();
  const s2 = new Singleton();

  console.log(s1 === s2); // false  
  console.log(s1.someMethod() === s2.someMethod()); // true
}