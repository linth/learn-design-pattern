package state.java.shopsale;

public class NewState extends BaseOrderState {
  public NewState(Order order) {
    super(order);
  }

  @Override
  public void payOrder() {
    System.out.println("✅ Payment successful.");
    this.order.setState(new PaidState(this.order));
  }

  @Override
  public void cancelOrder() {
    System.out.println("✅ Order cancelled.");
    this.order.setState(new CancelledState(this.order));
  }
}
