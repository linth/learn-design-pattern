import { OrderState } from './order-state.interface';
import { NewState } from './concrete-states';

/**
 * 訂單 class
 */
export class Order {
  private state: OrderState;

  constructor() {
    // Default state is New
    this.state = new NewState(this);
  }

  public setState(state: OrderState): void {
    this.state = state;
  }

  public getState(): OrderState {
    return this.state;
  }

  public payOrder(): void {
    this.state.payOrder();
  }

  public shipOrder(): void {
    this.state.shipOrder();
  }

  public deliverOrder(): void {
    this.state.deliverOrder();
  }

  public cancelOrder(): void {
    this.state.cancelOrder();
  }
}
