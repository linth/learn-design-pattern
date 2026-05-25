/**
 * 開放封閉原則 (Open/Closed Principle, OCP)
 * 軟體實體應對擴展開放，對修改關閉。
 * 此範例透過抽象化和策略模式，讓新增三明治口味時不需修改既有程式碼。
 *
 * Reference:
 *  - https://medium.com/front-end-weekly/s-o-l-i-d-principles-with-js-examples-db95b44e82e
 */

/** 尺寸規格 */
class Sizes {
  constructor(public name: string, public multiplier: number) {}
}

/** 抽象的三明治類別，定義共同結構 */
abstract class Sandwich {
  constructor(protected size: Sizes) {}

  /** 取得三明治描述，由子類別實作 */
  abstract getDescription(): string;

  /** 取得價格，由子類別實作 */
  abstract getBasePrice(): number;

  /** 根據尺寸計算最終價格 */
  getPrice(): number {
    return this.getBasePrice() * this.size.multiplier;
  }
}

/** 具體實作：火腿三明治 */
class HamSandwich extends Sandwich {
  getDescription(): string {
    return `${this.size.name}火腿三明治`;
  }

  getBasePrice(): number {
    return 50;
  }
}

/** 具體實作：蔬菜三明治 */
class VeggieSandwich extends Sandwich {
  getDescription(): string {
    return `${this.size.name}蔬菜三明治`;
  }

  getBasePrice(): number {
    return 40;
  }
}

/**
 * 新增口味時不需修改既有 Sandwich 或任何既有子類別，
 * 只需新增一個繼承 Sandwich 的類別即可（符合 OCP）。
 */
class ChickenSandwich extends Sandwich {
  getDescription(): string {
    return `${this.size.name}雞肉三明治`;
  }

  getBasePrice(): number {
    return 65;
  }
}

{
  const run = () => {
    const sizes = {
      small: new Sizes('小', 1),
      medium: new Sizes('中', 1.2),
      large: new Sizes('大', 1.5),
    };

    const sandwiches: Sandwich[] = [
      new HamSandwich(sizes.medium),
      new VeggieSandwich(sizes.small),
      new ChickenSandwich(sizes.large),
    ];

    for (const sandwich of sandwiches) {
      console.log(`${sandwich.getDescription()} - $${sandwich.getPrice()}`);
    }
  };

  run();
}