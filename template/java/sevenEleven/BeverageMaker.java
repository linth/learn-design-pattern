/**
 * 樣板方法模式 (Template Method Pattern)
 * 
 * 核心概念：
 * 1. 在一個方法中定義一個演算法的骨架（SOP），而將一些步驟延遲到子類別中。
 * 2. 樣板方法使得子類別可以在不改變演算法結構的情況下，重新定義演算法的某些步驟。
 * 3. 透過「掛鉤」(Hook) 機制，讓子類別能有選擇性地影響演算法流程。
 * 
 * 
 * BeverageMaker 飲料自動製作機
 * 
 * 抽象超類別 (Abstract Superclass)
 * - Beverage 飲料
 * 
 * 具體類別 (Concrete Class)
 * - Coffee 咖啡
 * - Tea 茶
 * - MilkTea 珍珠奶茶
 */

// 實作展示：7-11 飲料自動製作機
public class BeverageMaker {
  public static void main(String[] args) {
    System.out.println("--- 製作 Coffee ---");
    Beverage coffee = new Coffee();
    coffee.prepareRecipe();

    System.out.println("\n--- 製作 Tea (不加檸檬) ---");
    Beverage tea = new Tea(false); // 透過 Hook 控制不加料
    tea.prepareRecipe();

    System.out.println("\n--- 製作 MilkTea ---");
    Beverage milkTea = new MilkTea();
    milkTea.prepareRecipe();
  }
}

/**
 * [抽象超類別]：定義演算法骨架
 */
abstract class Beverage {

  /**
   * 樣板方法 (Template Method)
   * 宣告為 final 是為了防止子類別修改這個演算法 SOP 結構。
   */
  public final void prepareRecipe() {
    boilWater(); // 步驟 1：煮開水 (共用)
    brew(); // 步驟 2：沖泡 (子類別實作)
    pourInCup(); // 步驟 3：倒入杯子 (共用)

    // 使用「掛鉤」(Hook) 來決定是否要執行步驟 4
    if (customerWantsCondiments()) {
      addCondiments(); // 步驟 4：加配料 (子類別實作)
    }
  }

  /** 抽象方法：由子類別決定如何沖泡 */
  abstract void brew();

  /** 抽象方法：由子類別決定加什麼配料 */
  abstract void addCondiments();

  /** 共用方法：所有飲料都要煮開水 */
  private void boilWater() {
    System.out.println("[Beverage] 正在煮沸開水...");
  }

  /** 共用方法：所有飲料都要倒進杯子 */
  private void pourInCup() {
    System.out.println("[Beverage] 將飲料倒入杯中...");
  }

  /**
   * 掛鉤 (Hook)：子類別可以選擇性地覆寫它
   * 預設為 true (要加料)。
   */
  boolean customerWantsCondiments() {
    return true;
  }
}

/**
 * [具體類別]：咖啡
 */
class Coffee extends Beverage {
  @Override
  void brew() {
    System.out.println("[Coffee] 透過濾網滴濾咖啡");
  }

  @Override
  void addCondiments() {
    System.out.println("[Coffee] 加入糖與牛奶");
  }
}

/**
 * [具體類別]：茶
 */
class Tea extends Beverage {
  private boolean wantsCondiments = true;

  public Tea() {
  }

  public Tea(boolean wantsCondiments) {
    this.wantsCondiments = wantsCondiments;
  }

  @Override
  void brew() {
    System.out.println("[Tea] 浸泡茶包");
  }

  @Override
  void addCondiments() {
    System.out.println("[Tea] 加入新鮮檸檬片");
  }

  /** 覆寫掛鉤：根據建構子決定是否要加料 */
  @Override
  boolean customerWantsCondiments() {
    return this.wantsCondiments;
  }
}

/**
 * [具體類別]：珍珠奶茶 (展示易擴充性)
 */
class MilkTea extends Beverage {
  @Override
  void brew() {
    System.out.println("[MilkTea] 沖泡濃郁紅茶並加入牛奶");
  }

  @Override
  void addCondiments() {
    System.out.println("[MilkTea] 加入大顆珍珠（波霸）");
  }
}

/**
 * 總結：
 * 1. 易懂：超類別掌控了整個 SOP，子類別只需專注於自己的特色步驟。
 * 2. 易擴充：如果要新增「熱可可」，只需繼承 Beverage 並實作 brew() 與 addCondiments()。
 * 3. 程式碼複用：共用的邏輯（煮水、倒杯子）都在超類別，避免重複代碼。
 * 
 * 
 * --- 製作 Coffee ---
 * [Beverage] 正在煮沸開水...
 * [Coffee] 透過濾網滴濾咖啡
 * [Beverage] 將飲料倒入杯中...
 * [Coffee] 加入糖與牛奶
 * 
 * --- 製作 Tea (不加檸檬) ---
 * [Beverage] 正在煮沸開水...
 * [Tea] 浸泡茶包
 * [Beverage] 將飲料倒入杯中...
 * 
 * --- 製作 MilkTea ---
 * [Beverage] 正在煮沸開水...
 * [MilkTea] 沖泡濃郁紅茶並加入牛奶
 * [Beverage] 將飲料倒入杯中...
 * [MilkTea] 加入大顆珍珠（波霸）
 */
