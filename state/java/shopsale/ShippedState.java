package state.java.shopsale;

public class ShippedState extends BaseOrderState {
  public ShippedState(Order order) {
    super(order);
  }

  @Override
  public void deliverOrder() {
    System.out.println("✅ Order delivered.");
    this.order.setState(new DeliveredState(this.order));
  }
}
