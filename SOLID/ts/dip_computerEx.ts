/**
 * 依賴反轉原則 (Dependency Inversion Principle, DIP)
 *  - 高層模組不應依賴低層模組，兩者都應依賴抽象。
 *  - 抽象不應依賴細節，細節應依賴抽象。
 * 
 * 依賴注入（Dependency Injection）是實踐 DIP 的常見手段，
 * 透過建構子或 setter 將依賴從外部傳入，而非在內部自行 new 實體。
 *
 * Reference:
 *  - https://www.jyt0532.com/2020/03/24/dip/
 *  - https://medium.com/@yhosutun2491/design-pattern-%E4%BE%9D%E8%B3%B4%E5%8F%8D%E8%BD%89%E5%8E%9F%E5%89%87-dependency-inversion-principle-dip-725f29deca6f
 *  - https://www.appcoda.com.tw/dependency-inversion-principle/
 */

{
  // 違反 DIP：Programmer 直接依賴具體的 Computer，難以替換或測試
  class Programmer {
    private computer = new Computer();
    code(): void {
      this.computer.program();
    }
  }

  class Computer {
    program(): void {
      console.log('使用電腦寫程式...');
    }
  }
}

{
  // 遵循 DIP：高層與低層都依賴共同的抽象介面 Programmable
  interface Programmable {
    program(): void;
  }

  // 低層模組：桌上型電腦
  class Computer implements Programmable {
    program(): void {
      console.log('使用桌上型電腦寫程式...');
    }
  }

  // 低層模組：筆記型電腦（新增時不需修改 Programmer）
  class Laptop implements Programmable {
    program(): void {
      console.log('使用筆記型電腦寫程式...');
    }
  }

  // 高層模組：透過建構子注入依賴，不直接在內部 new
  class Programmer {
    constructor(private programmable: Programmable) {}

    code(): void {
      this.programmable.program();
    }
  }

  // 使用範例：可彈性切換不同裝置
  const programmer1 = new Programmer(new Computer());
  programmer1.code();

  const programmer2 = new Programmer(new Laptop());
  programmer2.code();
}

