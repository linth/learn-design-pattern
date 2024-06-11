/**
 * high-order function
 * 
 * 此設計方式是根據nestjs專案的modules: passportstrategy借鑑
 * 
 * 實際案例:
 *  - 認證策略: 實現不同認證方法的策略，如 JWT 和 OAuth
 *  - 日誌策略: 定義不同的日誌輸出方式，如文件和控制台
 *  - 支付策略: 處理不同支付方式的策略，如信用卡和 PayPal
 *  - 數據存儲策略: 實現不同的數據存儲方法，如本地存儲和雲存儲
 *  - 通知策略: 定義不同通知方式的策略，如電子郵件和短信
 */

{
  /**
   * export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
   * 
   * 這裡的 PassportStrategy 是一個高階函數 (Higher-Order Function)，
   * 它接受兩個參數並返回一個新的類。這樣的用法通常用於設置或配置某個類，
   * 然後返回一個自定義的類，該類可以被繼承。
   * 
   */

  // 可利用high-order function, 來決定被繼承的class.
  function PassportStrategy(BaseStrategy: any, name: string) {
    return class extends BaseStrategy {
      constructor(...args) {
        super(args);
        this.name = name;
      }
    }

    // other functions and attributes.
  };
}
