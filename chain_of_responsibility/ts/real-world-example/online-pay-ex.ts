/**
 * Online pay example.
 *  - 根據不同的轉帳額度, 給予不同的控制級別, 1000元以下直接轉, 1000~1萬用手機號碼驗證, 1萬以上需要人臉辨識
 * 
 * Reference:
 *  - https://juejin.cn/post/7017439694623342623?searchId=20240504002124C2FFA1D188D88289EBBA
 */

{
  class TransferRequest {
    money: number;

    constructor(money: number) {
      this.money = money;
    }

    getMoney(): number {
      return this.money;
    }

    setMoney(money: number): void {
      this.money = money;
    }
  }

  abstract class AbstractRiskControlHandler {
    name: string;
    protected superior: AbstractRiskControlHandler;

    constructor(name: string) {
      this.name = name;
    }

    abstract handleRequest(transferRequest: TransferRequest): void;

    getSuperior(): AbstractRiskControlHandler {
      return this.superior;
    } 

    setSuperior(superior: AbstractRiskControlHandler): void {
      this.superior = superior;
    }
  }

  class FirstRiskControlHandler extends AbstractRiskControlHandler {
    constructor(name: string) {
      super(name);
    }

    handleRequest(transferRequest: TransferRequest): void {
      if (transferRequest.getMoney() <= 1000) {
        console.log('簡單轉帳操作');
        console.log(this.name, '轉帳金額', transferRequest.getMoney(), '成功完成');
      } else {
        if (this.superior != null) {
          this.superior.handleRequest(transferRequest);
        }
      }
    }
  }

  class SecondRiskControlHandler extends AbstractRiskControlHandler {
    constructor(name: string) {
      super(name);
    }

    handleRequest(transferRequest: TransferRequest): void {
      if (transferRequest.getMoney() > 1000 && transferRequest.getMoney() <= 10000) {
        console.log('資金稍大, 需輸入密碼+簡訊驗證碼');
        console.log(this.name, '轉帳金額', transferRequest.getMoney(), '成功完成');
      } else {
        if (this.superior != null) {
          this.superior.handleRequest(transferRequest);
        }
      }
    }
  }

  class ThirdRiskControlHandler extends AbstractRiskControlHandler {
    constructor(name: string) {
      super(name);
    }

    handleRequest(transferRequest: TransferRequest): void {
      if (transferRequest.getMoney() > 10000) {
        console.log('大資金操作, 需要密碼+簡訊+人臉辨識');
        console.log(this.name, '轉帳金額', transferRequest.getMoney(), '成功完成');
      } else {
        if (this.superior != null) {
          this.superior.handleRequest(transferRequest);
        }
      }
    }
  }

  const firstRiskControlHandler = new FirstRiskControlHandler('初級');
  const secondControlHandler = new SecondRiskControlHandler('中級');
  const thirdRiskControlHandler = new ThirdRiskControlHandler('高級');

  firstRiskControlHandler.setSuperior(secondControlHandler);
  secondControlHandler.setSuperior(thirdRiskControlHandler);

  const request = new TransferRequest(1000);
  firstRiskControlHandler.handleRequest(request);
}