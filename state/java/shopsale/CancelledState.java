package state.java.shopsale;

public class CancelledState extends BaseOrderState {
  public CancelledState(Order order) {
    super(order);
    System.out.println("ℹ️ Order is now in Cancelled state.");
  }
}
