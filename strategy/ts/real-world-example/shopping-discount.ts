/**
 * Shopping discount (折扣方式) - 策略模式
 * 
 * Reference:
 *  - https://juejin.cn/post/7005608737050198053?searchId=20240504002124C2FFA1D188D88289EBBA
 */

{
  // 產品資訊
  class ProductOrder {
    oldPrice: number;
    userId: number;
    productId: number;

    constructor(oldPrice: number, userId: number, productId: number) {
      this.oldPrice = oldPrice;
      this.userId = userId;
      this.productId = productId;
    }

    getOldPrice(): number {
      return this.oldPrice;
    }

    getUserId(): number {
      return this.userId;
    }

    getProductId(): number {
      return this.productId;
    }
  }

  // 折扣策略介面
  interface ActivityStratgy {
    computePrice(productOrder: ProductOrder): number; 
  }

  // 無折扣
  class NormalActivityStrategy implements ActivityStratgy {
    computePrice(productOrder: ProductOrder): number {
      return productOrder.getOldPrice();
    }
  }

  // 打折優惠
  class DiscountActivityStrategy implements ActivityStratgy {
    rate: number;

    constructor(rate: number) {
      this.rate = rate;
    }

    computePrice(productOrder: ProductOrder): number {
      return productOrder.getOldPrice() * this.rate;
    }
  }

  // 優惠卷
  class VoucherActivityStrategy implements ActivityStratgy {
    voucher: number;

    constructor(voucher: number) {
      this.voucher = voucher;
    }

    computePrice(productOrder: ProductOrder): number {
      if (productOrder.getOldPrice() > this.voucher) {
        return productOrder.getOldPrice() - this.voucher;
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
  console.log('正常價格: ', finalPrice);
  
  // 打折優惠
  const das = new DiscountActivityStrategy(0.7);
  const pc2 = new PromotionContext(das);
  finalPrice = pc2.executeStrategy(po);
  console.log('打折優惠: ', finalPrice);

  // 優惠卷
  const vas = new VoucherActivityStrategy(300);
  const pc3 = new PromotionContext(vas);
  finalPrice = pc3.executeStrategy(po);
  console.log('優惠卷價格: ', finalPrice);
}