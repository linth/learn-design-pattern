package state.java.shopsale;

public class PaidState extends BaseOrderState {
  public PaidState(Order order) {
    super(order);
  }

  @Override
  public void shipOrder() {
    System.out.println("✅ Order shipped.");
    this.order.setState(new ShippedState(this.order));
  }

  @Override
  public void cancelOrder() {
    System.out.println("✅ Order cancelled. Refunding payment...");
    this.order.setState(new CancelledState(this.order));
  }
}
