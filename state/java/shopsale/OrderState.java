package state.java.shopsale;

public interface OrderState {
  void payOrder();

  void shipOrder();

  void deliverOrder();

  void cancelOrder();
}
