/**
 * User case: payment situation with adapter design pattern.
 *  - 當你需要使用不同的支付系統時，每個系統都有自己的API，但是它們的接口不同，這時候可以使用轉接器模式來統一它們的接口，讓你的代碼更加通用。
 * 
 * TODO: more example.
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/adapter
 */

{
  // 定義支付系統的接口
  interface PaymentSystem {
    pay(amount: number): void;
  }

  // 第一個支付系統 A
  class PaymentSystemA {
    makePayment(price: number) {
      console.log(`支付 ${price} 元 (使用支付系統A)`);
    }
  }

  // 第二個支付系統 B
  class PaymentSystemB {
    payMoney(amount: number) {
      console.log(`支付 ${amount} 元 (使用支付系統B)`);
    }
  }

  // 定義支付系統 A 轉接器
  class PaymentSystemAToPaymentSystemAdapter implements PaymentSystem {
    constructor(private paymentSystem: PaymentSystemA) {}

    pay(amount: number): void {
      this.paymentSystem.makePayment(amount);
    }
  }

  // 定義支付系統 B 轉接器
  class PaymentSystemBToPaymentSystemAdapter implements PaymentSystem {
    constructor(private paymentSystem: PaymentSystemB) {}

    pay(amount: number): void {
      this.paymentSystem.payMoney(amount);
    }
  }

  // 使用支付系統 A
  const psa = new PaymentSystemA();
  const payByAdapterA: PaymentSystem = new PaymentSystemAToPaymentSystemAdapter(psa);
  payByAdapterA.pay(100); // 支付 100 元 (使用支付系統A)

  // 使用支付系統 B
  const psb = new PaymentSystemB();
  const payByAdapterB: PaymentSystem = new PaymentSystemBToPaymentSystemAdapter(psb);
  payByAdapterB.pay(200); // 支付 200 元 (使用支付系統B)
}