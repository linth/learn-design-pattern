/**
 * Coupon example with CoR design pattern. (優惠卷實際範例)
 * 
 * 
 */

{
  // Request
  class CouponRequest {
    code: string;
    amount: number;

    constructor(code: string, amount: number) {
      this.code = code;
      this.amount = amount;
    }
  }

  abstract class CouponHandler {
    private nextHandler: CouponHandler | null = null;

    setNextHandler(handler: CouponHandler): void {
      this.nextHandler = handler;
    }

    handleRequest(request: CouponRequest): void {
      if (this.canHandle(request)) {
        this.applyCoupon(request);
      } else if (this.nextHandler) {
        this.nextHandler.handleRequest(request);
      } else {
        console.log('Invalid coupon code:', request.code);
      }
    }

    abstract canHandle(request: CouponRequest): boolean;
    abstract applyCoupon(request: CouponRequest): void;
  }

  /** 折扣卷處理器 */
  class DiscountCouponHandler extends CouponHandler {
    canHandle(request: CouponRequest): boolean {
      return request.code.startsWith('DISCOUNT');
    }

    applyCoupon(request: CouponRequest): void {
      console.log(`Applying discount coupon ${request.code} to amount ${request.amount}`);
    }
  }

  /** 免運費卷處理器 */
  class FreeShippingCouponHandler extends CouponHandler {
    canHandle(request: CouponRequest): boolean {
      return request.code.startsWith('FREESHIP');
    }

    applyCoupon(request: CouponRequest): void {
      console.log(`Applying free shipping coupon ${request.code} to amount ${request.amount}`);
    }
  }

  /** 滿多少折扣多少金額 */
  class ThresholdCouponHandler extends CouponHandler {
    canHandle(request: CouponRequest): boolean {
      return request.code.startsWith('THRESHOLD');
    }

    applyCoupon(request: CouponRequest): void {
      console.log(`Applying threshold coupon ${request.code} to amount ${request.amount}`);
    }
  }


  const discountHandler = new DiscountCouponHandler();
  const thresholdHandler = new ThresholdCouponHandler();
  const freeShippingHandler = new FreeShippingCouponHandler();

  discountHandler.setNextHandler(thresholdHandler);
  thresholdHandler.setNextHandler(freeShippingHandler);

  const request1 = new CouponRequest('DISCOUNT123', 100);
  const request2 = new CouponRequest('THRESHOLD456', 200);
  const request3 = new CouponRequest('FREESHIP789', 0); // 0 表示免運

  discountHandler.handleRequest(request1); // Applying discount coupon DISCOUNT123 to amount 100
  discountHandler.handleRequest(request2); // Applying threshold coupon THRESHOLD456 to amount 200
  discountHandler.handleRequest(request3); // Applying free shipping coupon FREESHIP789 to amount 0

}



