import { OrderState } from './order-state.interface';
import { Order } from './order';

/**
 * 狀態模式 - 訂單狀態具體實作
 * 每個狀態清楚定義自己能執行的操作，以及可以轉換到哪些狀態。
 */

/**
 * 抽象基底狀態：提供各操作的預設行為。
 * 預設所有操作都顯示「不允許」，子類別只覆寫自己允許的操作。
 */
abstract class BaseOrderState implements OrderState {
  protected order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public payOrder(): void {
    console.log('❌ 付款失敗：目前狀態不允許此操作。');
  }

  public shipOrder(): void {
    console.log('❌ 出貨失敗：目前狀態不允許此操作。');
  }

  public deliverOrder(): void {
    console.log('❌ 送達失敗：目前狀態不允許此操作。');
  }

  public cancelOrder(): void {
    console.log('❌ 取消失敗：目前狀態不允許此操作。');
  }
}

// --- 具體狀態 ---

/** 新訂單：可付款或取消 */
export class NewState extends BaseOrderState {
  public payOrder(): void {
    console.log('✅ 付款成功。');
    this.order.setState(new PaidState(this.order));
  }

  public cancelOrder(): void {
    console.log('✅ 訂單已取消。');
    this.order.setState(new CancelledState(this.order));
  }
}

/** 已付款：可出貨或取消（需退款） */
export class PaidState extends BaseOrderState {
  public shipOrder(): void {
    console.log('✅ 已出貨。');
    this.order.setState(new ShippedState(this.order));
  }

  public cancelOrder(): void {
    console.log('✅ 訂單已取消，正在退款...');
    this.order.setState(new CancelledState(this.order));
  }
}

/** 已出貨：只能送達 */
export class ShippedState extends BaseOrderState {
  public deliverOrder(): void {
    console.log('✅ 訂單已送達。');
    this.order.setState(new DeliveredState(this.order));
  }
}

/** 已送達：最終狀態，不允許任何操作 */
export class DeliveredState extends BaseOrderState {
  public constructor(order: Order) {
    super(order);
    console.log('ℹ️ 訂單已送達（最終狀態）。');
  }
}

/** 已取消：最終狀態，不允許任何操作 */
export class CancelledState extends BaseOrderState {
  public constructor(order: Order) {
    super(order);
    console.log('ℹ️ 訂單已取消（最終狀態）。');
  }
}
