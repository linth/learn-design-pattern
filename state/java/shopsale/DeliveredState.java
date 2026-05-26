package state.java.shopsale;

public class DeliveredState extends BaseOrderState {
  public DeliveredState(Order order) {
    super(order);
    System.out.println("ℹ️ Order is now in Delivered state.");
  }
}
