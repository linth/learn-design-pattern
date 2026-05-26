package state.java.shopsale;

public class Order {
  private OrderState state;

  public Order() {
    // Default state is New
    this.state = new NewState(this);
  }

  public void setState(OrderState state) {
    this.state = state;
  }

  public OrderState getState() {
    return this.state;
  }

  public void payOrder() {
    this.state.payOrder();
  }

  public void shipOrder() {
    this.state.shipOrder();
  }

  public void deliverOrder() {
    this.state.deliverOrder();
  }

  public void cancelOrder() {
    this.state.cancelOrder();
  }
}
