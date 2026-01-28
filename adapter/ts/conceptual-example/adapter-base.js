"use strict";

/**
 * 適配器模式 (Adapter Design Pattern)
 * 
 * 核心概念：
 * 1. 轉換器：將一個類別的介面轉換成客戶端期待的另一個介面。
 * 2. 讓原本因介面不相容而無法合作的類別可以一起運作。
 * 3. 解決「既有程式碼」或「第三方套件」與「系統現有介面」不合的問題。
 */

{
  // ======================================================
  // 1. [目標介面 Target]：我們系統內部定義的統一支付介面
  // ======================================================
  class PaymentProcessor {
    /** 使用者呼叫的方法：統一接收元 (Dollar) 做為單位 */
    pay(amount) {
      throw new Error("Method 'pay()' must be implemented.");
    }
  }

  // ======================================================
  // 2. [被適配者 Adaptee]：各種介面不相容的支付方案
  // ======================================================

  /** 情况 A：老舊系統 (Legacy System) - 使用不同的方法名 */
  class OldBankSystem {
    originalPay(amount) {
      console.log(`    [OldBank] 執行支付: ${amount} 元`);
    }
  }

  /** 情况 B：三方 API (New Third-party API) - 使用毫分為單位，且需要傳入貨幣類型 */
  class GlobalPaySDK {
    makeCharge(amountInCents, currency) {
      console.log(`    [GlobalPay] 執行扣款: ${amountInCents} 毫分 (${currency})`);
    }
  }

  // ======================================================
  // 3. [適配器 Adapter]：橋接目標介面與被適配者
  // ======================================================

  /** 適配老舊系統：主要處理方法名稱的映射 */
  class LegacyBankAdapter extends PaymentProcessor {
    constructor(oldBank) {
      super();
      this.oldBank = oldBank;
    }

    pay(amount) {
      // 轉發請求給 Adaptee
      this.oldBank.originalPay(amount);
    }
  }

  /** 適配三方 API：處理單位換算 (元 -> 毫分) 與 參數封裝 */
  class GlobalPayAdapter extends PaymentProcessor {
    constructor(globalPaySDK) {
      super();
      this.sdk = globalPaySDK;
    }

    pay(amount) {
      // 邏輯轉換：我們的系統傳入 100 元，SDK 預期 10000 毫分
      const amountInCents = amount * 100;
      const currency = "TWD";
      this.sdk.makeCharge(amountInCents, currency);
    }
  }

  // ======================================================
  // 4. [客戶端實作展示]
  // ======================================================

  /** 
   * 客戶端函數 (Client Code)
   * 只需要針對統一的 PaymentProcessor 介面寫程式，不需關心背後是哪種 SDK。
   */
  function processOrder(processor, amount) {
    console.log(`>>> 正準備處理金額為 ${amount} 的訂單...`);
    processor.pay(amount);
    console.log(`>>> 訂單處理完成。\n`);
  }

  // --- 實作展示 ---

  console.log("--- 範例 1: 使用適配後的舊銀行系統 ---");
  const oldBank = new OldBankSystem();
  const bankAdapter = new LegacyBankAdapter(oldBank);
  processOrder(bankAdapter, 100);

  console.log("--- 範例 2: 使用適配後的三方 SDK ---");
  const globalSDK = new GlobalPaySDK();
  const sdkAdapter = new GlobalPayAdapter(globalSDK);
  processOrder(sdkAdapter, 250);

  /**
   * [易擴充性證明]：
   * 如果明天要引入一家新的支付商 "CryptoPay"，其方法是 transfer(cryptoAmount, walletAddress)。
   * 我們只需建立一個 CryptoPayAdapter，而不需變動 `processOrder` 或其他現有的支付邏輯。
   */
}
