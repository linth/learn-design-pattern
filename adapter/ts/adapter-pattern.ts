/**
 * adapter design pattern.
 *  - 1. 我們定義一個目標接口（Target），這個接口是需要被轉換的類的目標接口，可以是一個抽象類或者接口。
 *  - 2. 我們定義一個需要被轉換的類（Adaptee），這個類已經存在，但是它的接口與目標接口不相同
 *  - 3. 為了實現轉接器模式，我們需要創建一個轉接器（Adapter），這個轉接器實現了目標接口，但是在內部使用了需要被轉換的類。
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/adapter
 * 
 * 
 * 轉接器模式通常用於以下幾種情況：
 *  - 1. 你需要使用一個現有的類，但是它的接口與你的代碼不兼容。
 *  - 2. 你想要創建一個可以重複使用的類，這個類可以與不同的類協同工作，但是它們的接口不同。
 *  - 3. 你需要在不影響現有代碼的情況下，添加一些新功能。
 * 
 * 在這些情況下，使用轉接器模式可以幫助你解決這些問題，同時保持代碼的可重用性和可擴展性。
 * 例如，在開發一個新應用時，你需要使用一個現有的第三方庫來處理某些任務。然而，該庫的接口與你的代碼不兼容，因此你需要編寫一個轉接器來將庫的接口轉換為你的代碼所需的接口，從而實現對該庫的使用。此外，如果你需要在未來添加其他庫或更新現有庫的版本，你可以繼續使用相同的轉接器，從而保持代碼的可重用性和可維護性。
 */

{
  interface Target {
    // 我們定義一個目標接口（Target），這個接口是需要被轉換的類的目標接口，可以是一個抽象類或者接口：
    request(): void;
  }
  
  class Adaptee {
    // 接下來，我們定義一個需要被轉換的類（Adaptee），這個類已經存在，但是它的接口與目標接口不相同：
    specificRequest(): void {
      console.log(`Adaptee specific request.`);      
    }
  }

  class Adapter implements Target {
    // 為了實現轉接器模式，我們需要創建一個轉接器（Adapter），這個轉接器實現了目標接口，但是在內部使用了需要被轉換的類：
    private adaptee: Adaptee = new Adaptee();

    request(): void {
        this.adaptee.specificRequest();
    }
  }

  const target: Target = new Adapter();
  target.request(); // Adaptee specific request.

  /**
   * 在這個示例中，我們定義了一個目標接口（Target），它定義了一個 request 方法。
   * 然後，我們定義了一個需要被轉換的類（Adaptee），它定義了一個 specificRequest 方法。
   * 最後，我們創建了一個轉接器（Adapter），它實現了目標接口，並且在內部使用了 Adaptee 的 specificRequest 方法。
   * 通過這樣的方式，我們實現了一個可以讓不兼容的類協同工作的轉接器模式。
   */
}
