package state.java.shopsale;

public class Client {
  public static void main(String[] args) {
    System.out.println("--- Order System State Pattern Demo (Java) ---");

    // Scenario 1: Standard Success Flow
    System.out.println("\n--- Scenario 1: Standard Success Flow ---");
    Order order1 = new Order();
    System.out.println("Order created.");

    order1.payOrder();
    order1.shipOrder();
    order1.deliverOrder();

    // Try to pay again after delivery
    System.out.println("\nTrying to pay after delivery:");
    order1.payOrder(); // Should fail

    // Scenario 2: Cancellation Flow
    System.out.println("\n--- Scenario 2: Cancellation Flow ---");
    Order order2 = new Order();
    System.out.println("Order created.");

    order2.payOrder();
    System.out.println("Decided to cancel order...");
    order2.cancelOrder();

    System.out.println("\nTrying to ship after cancellation:");
    order2.shipOrder(); // Should fail

    // Scenario 3: Invalid Transitions
    System.out.println("\n--- Scenario 3: Invalid Transitions ---");
    Order order3 = new Order();
    System.out.println("Order created.");
    System.out.println("Trying to ship immediately:");
    order3.shipOrder(); // Should fail because it's not paid yet
  }
}
