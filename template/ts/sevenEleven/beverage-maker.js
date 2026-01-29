/**
 * 樣板方法模式 (Template Method Pattern) - JavaScript 版本
 * 
 * 核心概念：
 * 這種模式在 JS 中非常流行，特別是在需要定義一系列固定流程但允許細節客製化時。
 * 雖然 JS 沒有抽象類別 (Abstract Class)，但我們可以使用「拋出錯誤」來模擬抽象方法。
 */

class Beverage {
  /**
   * 樣板方法 (Template Method)
   * 這是製作飲料的標準 SOP，不應被子類別修改。
   */
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();

    // 掛鉤 (Hook) 機制
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }

  /** 模擬抽象方法：子類別必須實作，否則報錯 */
  brew() {
    throw new Error("Method 'brew()' 必須由子類別實作！");
  }

  addCondiments() {
    throw new Error("Method 'addCondiments()' 必須由子類別實作！");
  }

  /** 共用方法 */
  boilWater() {
    console.log("[Beverage] 正將開水煮至沸騰...");
  }

  pourInCup() {
    console.log("[Beverage] 倒入專用外帶杯...");
  }

  /** 
   * 掛鉤 (Hook)
   * 預設回傳 true，子類別可以覆寫來控制流程控制。
   */
  customerWantsCondiments() {
    return true;
  }
}

// --- 具體實作 (子類別) ---

class Coffee extends Beverage {
  brew() {
    console.log("[Coffee] 通過研磨咖啡粉沖泡");
  }

  addCondiments() {
    console.log("[Coffee] 加入適量的糖與新鮮牛奶");
  }
}

class Tea extends Beverage {
  constructor(wantsCondiments = true) {
    super();
    this._wantsCondiments = wantsCondiments;
  }

  brew() {
    console.log("[Tea] 將嚴選茶葉浸泡於沸水中");
  }

  addCondiments() {
    console.log("[Tea] 加入冰塊與檸檬片");
  }

  /** 覆寫 Hook，根據實例化時的參數決定 */
  customerWantsCondiments() {
    return this._wantsCondiments;
  }
}

// --- 執行展示 ---

console.log("=== JavaScript 樣板方法模式展示 ===");

console.log("\n--- 客戶 A 點了咖啡 ---");
const myCoffee = new Coffee();
myCoffee.prepareRecipe();

console.log("\n--- 客戶 B 點了檸檬茶 ---");
const lemonTea = new Tea(true);
lemonTea.prepareRecipe();

console.log("\n--- 客戶 C 點了去檸檬的茶 (透過 Hook) ---");
const plainTea = new Tea(false);
plainTea.prepareRecipe();
