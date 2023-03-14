/**
 * Law of Demeter (迪米特法則)
 *  - 假設有一個銀行帳戶(Account)類別，該類別包含了存款、提款和查詢餘額等功能。現在，有一個客戶(Customer)類別需要獲取帳戶的餘額信息。
 *  - 根據迪米特法則，客戶類別不應該直接訪問帳戶類別的內部結構，而應該通過中介者（Mediator）來進行交互。
 * 
 *  - 具體實現方式是，在銀行帳戶類別中添加一個查詢餘額的方法(getBalance)
 *  - 然後在中介者類別（例如銀行服務器）中添加一個獲取帳戶餘額的方法(getAccountBalance)
 *  - 客戶類別通過調用中介者的方法來獲取帳戶的餘額信息。
 * 
 */

class Account {
  // 帳號
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds.");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

class BankServer {
  // 銀行伺服器
  private accounts: Map<Account, number>;

  constructor() {
    this.accounts = new Map();
  }

  addAccount(account: Account): void {
    this.accounts.set(account, account.getBalance());
  }

  getAccountBalance(account: Account): number {
    return this.accounts.get(account) || 0;
  }
}

class CustomerBanker {
  // 銀行客戶
  private name: string;
  private account: Account;

  constructor(name: string, account: Account) {
    this.name = name;
    this.account = account;
  }

  getBalance(server: BankServer): number {
    return server.getAccountBalance(this.account);
  }
}

function accountBankerCustomerMain() {

  // 建立兩個 account.
  const a1 = new Account(1000);
  const a2 = new Account(2000);

  // 建立兩個 custom.
  const c1 = new CustomerBanker('George', a1);
  const c2 = new CustomerBanker('Peter', a2);

  const bs = new BankServer();
  bs.addAccount(a1);
  bs.addAccount(a2);

  console.log(`account 1 has $${bs.getAccountBalance(a1)}`);
  console.log(`account 2 has $${bs.getAccountBalance(a2)}`);

  console.log(`account 1 has $${c1.getBalance(bs)}`);
  console.log(`account 2 has $${c2.getBalance(bs)}`);
}

accountBankerCustomerMain();