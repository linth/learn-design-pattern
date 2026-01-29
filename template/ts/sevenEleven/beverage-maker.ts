/**
 * 樣板方法模式 (Template Method Pattern) - TypeScript 版本
 * 
 * 核心概念：
 * 1. 定義演算法骨架：在超類別中定義一個固定步驟的 SOP。
 * 2. 步驟延遲實作：將具體細節（如沖泡方式、配料）留給子類別去實現。
 * 3. 掛鉤 (Hook)：透過一個預設傳回布林值的方法，讓子類別能「插手」演算法的流程控制。
 */

/**
 * [抽象超類別]：飲料基底
 * 在 TypeScript 中，我們可以使用 abstract class 來強制子類別實作特定方法。
 */
abstract class Beverage {

  /**
   * 樣板方法 (Template Method)
   * 定義了製作飲料的 SOP 流程。
   */
  public prepareRecipe(): void {
    this.boilWater();         // 步驟 1 (共用)
    this.brew();              // 步驟 2 (差異化)
    this.pourInCup();         // 步驟 3 (共用)

    // 透過掛鉤控制步驟 4
    if (this.customerWantsCondiments()) {
      this.addCondiments(); // 步驟 4 (差異化)
    }
  }

  /** 抽象方法：具體如何沖泡，由子類別決定 */
  protected abstract brew(): void;

  /** 抽象方法：具體加什麼配料，由子類別決定 */
  protected abstract addCondiments(): void;

  /** 共用邏輯：煮水 */
  private boilWater(): void {
    console.log("[Beverage] 正在煮沸開水...");
  }

  /** 共用邏輯：倒入杯子 */
  private pourInCup(): void {
    console.log("[Beverage] 將飲料倒入杯中...");
  }

  /** 
   * 掛鉤 (Hook)
   * 提供預設行為，子類別可視需求「覆寫」它來改變流程。
   */
  protected customerWantsCondiments(): boolean {
    return true;
  }
}

// --- 具體實作類別 ---

/**
 * 咖啡類別
 */
class Coffee extends Beverage {
  protected brew(): void {
    console.log("[Coffee] 透過濾網滴濾咖啡豆萃取液");
  }

  protected addCondiments(): void {
    console.log("[Coffee] 加入有機糖與鮮奶油");
  }
}

/**
 * 茶類別 (展示 Hook 的彈性)
 */
class Tea extends Beverage {
  // 透過屬性控制 Hook 行為
  constructor(private readonly wantsLemon: boolean = true) {
    super();
  }

  protected brew(): void {
    console.log("[Tea] 浸泡高山烏龍茶包");
  }

  protected addCondiments(): void {
    console.log("[Tea] 加入新鮮萊姆片");
  }

  /** 覆寫 Hook：根據實例狀態決定是否要加料 */
  protected customerWantsCondiments(): boolean {
    return this.wantsLemon;
  }
}

/**
 * 珍珠奶茶 (易擴充性證明)
 */
class MilkTea extends Beverage {
  protected brew(): void {
    console.log("[MilkTea] 沖泡錫蘭紅茶並混合香醇牛奶");
  }

  protected addCondiments(): void {
    console.log("[MilkTea] 加入Ｑ彈黑糖珍珠");
  }
}

// --- 執行展示 ---

function runBeverageMaker() {
  console.log("--- 1. 製作經典咖啡 ---");
  const coffee = new Coffee();
  coffee.prepareRecipe();

  console.log("\n--- 2. 製作檸檬紅茶 (使用預設加料) ---");
  const lemonTea = new Tea();
  lemonTea.prepareRecipe();

  console.log("\n--- 3. 製作純紅茶 (透過 Hook 拒絕加料) ---");
  const plainTea = new Tea(false);
  plainTea.prepareRecipe();

  console.log("\n--- 4. 製作珍珠奶茶 (新擴充品項) ---");
  const bobaMilkTea = new MilkTea();
  bobaMilkTea.prepareRecipe();
}

runBeverageMaker();

/**
 * TS/JS 版本優點總結：
 * 1. 強型別檢查：使用 abstract 確保開發者不會漏掉必要的步驟。
 * 2. 結構清晰：利用 Class 的繼承特性，將「變」與「不變」的邏輯完美拆分。
 * 3. 易於擴充：想要加新口味？繼承 Beverage 並填空即可，不需修改既有基礎代碼 (符合 OCP)。
 */
