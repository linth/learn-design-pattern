/**
 * 獨體模式 (Singleton Pattern) - 基本範例
 * 確保一個類別只有一個實例，並提供全域存取點。
 */

{
  class Singleton {
    private static instance: Singleton | null = null;

    // 注意：此處為了展示直接 new 的效果，將 constructor 設為公開
    // 正式實作應將 constructor 設為 private
    constructor() {}

    /** 取得唯一的實例 */
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }

    public someMethod(): void {
      console.log('Singleton 方法被呼叫');
    }
  }

  // 使用 getInstance() 取得同一個實例
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();
  console.log(`s1 === s2 ? ${s1 === s2}`); // true

  // 但因為 constructor 是公開的，以下會建立不同實例（違反 Singleton 原則）
  const s3 = new Singleton();
  console.log(`s1 === s3 ? ${s1 === s3}`); // false

  // 正確做法應將 constructor 設為 private
}
