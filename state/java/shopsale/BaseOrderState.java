package state.java.shopsale;

public abstract class BaseOrderState implements OrderState {
  protected Order order;

  public BaseOrderState(Order order) {
    this.order = order;
  }

  @Override
  public void payOrder() {
    System.out.println("❌ Payment failed: This action is not allowed in current state.");
  }

  @Override
  public void shipOrder() {
    System.out.println("❌ Shipping failed: This action is not allowed in current state.");
  }

  @Override
  public void deliverOrder() {
    System.out.println("❌ Delivery failed: This action is not allowed in current state.");
  }

  @Override
  public void cancelOrder() {
    System.out.println("❌ Cancellation failed: This action is not allowed in current state.");
  }
}
