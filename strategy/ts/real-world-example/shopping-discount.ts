/**
 * Shopping discount (折扣方式) - 策略模式
 * 
 * Reference:
 *  - https://juejin.cn/post/7005608737050198053?searchId=20240504002124C2FFA1D188D88289EBBA
 */

{
  interface Product {
    oldPrice: number;
    userId: number;
    productId: number;
  }

  // 產品資訊
  class ProductOrder implements Product {
    protected _oldPrice: number;
    protected _userId: number;
    protected _productId: number;

    constructor(o: number, u: number, p: number) {
      this._oldPrice = o;
      this._userId = u;
      this._productId = p;
    }

    get oldPrice(): number {
      return this._oldPrice;
    }

    get userId(): number {
      return this._userId;
    }

    get productId(): number {
      return this._productId;
    }
  }

  // 折扣策略介面
  interface ActivityStratgy {
    computePrice(productOrder: ProductOrder): number; 
  }

  // 無折扣
  class NormalActivityStrategy implements ActivityStratgy {
    computePrice(productOrder: ProductOrder): number {
      return productOrder.oldPrice;
    }
  }

  // 打折優惠
  class DiscountActivityStrategy implements ActivityStratgy {
    rate: number;

    constructor(rate: number) {
      this.rate = rate;
    }

    computePrice(productOrder: ProductOrder): number {
      return productOrder.oldPrice * this.rate;
    }
  }

  // 優惠卷
  class VoucherActivityStrategy implements ActivityStratgy {
    voucher: number;

    constructor(voucher: number) {
      this.voucher = voucher;
    }

    computePrice(productOrder: ProductOrder): number {
      if (productOrder.oldPrice > this.voucher) {
        return productOrder.oldPrice - this.voucher;
      } else {
        return 0;
      }
    }
  }

  class PromotionContext {
    activityStrategy: ActivityStratgy;

    constructor(activityStrategy: ActivityStratgy) {
      this.activityStrategy = activityStrategy;
    }

    executeStrategy(productOrder: ProductOrder): number {
      return this.activityStrategy.computePrice(productOrder);
    }
  }

  const po = new ProductOrder(800, 9527, 1001);
  let finalPrice: number;

  // 無折扣
  const nas = new NormalActivityStrategy();
  const pc1 = new PromotionContext(nas);
  finalPrice = pc1.executeStrategy(po);
  console.log('正常價格: ', finalPrice); // 正常價格:  800
  
  // 打折優惠
  const das = new DiscountActivityStrategy(0.7);
  const pc2 = new PromotionContext(das);
  finalPrice = pc2.executeStrategy(po);
  console.log('打折優惠: ', finalPrice); // 打折優惠:  560

  // 優惠卷
  const vas = new VoucherActivityStrategy(300);
  const pc3 = new PromotionContext(vas);
  finalPrice = pc3.executeStrategy(po);
  console.log('優惠卷價格: ', finalPrice); // 優惠卷價格:  500
}