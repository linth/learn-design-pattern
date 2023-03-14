/**
 * Law of Demeter (迪米特法則)
 *  - 又稱為最少知識原則（Principle of Least Knowledge），是一種物件導向設計的原則。該原則強調一個物件應只與其直接相互作用的物件進行交互，而不應該瀏覽其它物件的內部細節，這樣可以減少物件之間的耦合度，提高程式的可維護性和可讀性。
 *  - 當一個物件需要與其它物件進行交互時，它只需通過該物件的公共接口進行交互，而不需要直接訪問該物件的內部結構。這樣可以避免過多的相互依賴關係，從而提高代碼的靈活性和可重用性。
 *  - 迪米特法則在軟件設計中具有重要的地位，它是設計高質量、易於維護的物件導向系統的關鍵原則之一。通過遵循迪米特法則，可以使代碼更加可讀、可靠和易於擴展，從而提高軟件的質量和可靠性。
 * 
 * Reference:
 *  - https://en.wikipedia.org/wiki/Law_of_Demeter
 * 
 */


class Customer {
  // 客戶
  wallet: CustomerWallet;

  constructor() {
    this.wallet = new CustomerWallet(1000); // the custom has $1000 dollar.
  }
}

class Shopkeeper {
  // 店家

  processPurchase(product: Product, customer: Customer) {
    const price = product.get_price();
    customer.wallet.takeMoney(price);
  }
}

class CustomerWallet {
  // 客戶的錢包
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  addMoney(deposit: number) {
    this.amount += deposit;
  }

  takeMoney(debit: number) {
    this.amount -= debit;
  }
}

class Product {
  // 產品
  price: number = 0;

  constructor(price: number) {
    this.price = price;
  }

  get_price() {
    return this.price;
  }
}


function main() {
  const c = new Customer();
  console.log(`create a new custom has $${c.wallet.amount}`);
  
  const p1 = new Product(150); // product 1.
  const p2 = new Product(500); // product 2.

  const sk = new Shopkeeper();

  sk.processPurchase(p2, c);
  console.log(`the custom has ${c.wallet.amount}`); // 500.
  sk.processPurchase(p1, c);
  console.log(`the custom has ${c.wallet.amount}`); // 350.
}

main();