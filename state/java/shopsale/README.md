# State Design Pattern - Shop Sale Order System (Java)

This directory contains the **Java** implementation of the Shop Sale Order System using the State Design Pattern.

## Directory Structure

- `OrderState.java`: Interface for order states.
- `BaseOrderState.java`: Abstract base class implementing default "not allowed" behaviors.
- `Order.java`: Context class maintaining the current state.
- `Client.java`: Main entry point demonstrating the flow.
- `NewState.java`, `PaidState.java`, `ShippedState.java`, `DeliveredState.java`, `CancelledState.java`: Concrete state implementations.

## How to Run

Compile and run the Java files from this directory:

```bash
javac *.java
java Client
```

## Output

You should see an output demonstrating the state transitions and validation of allowed/disallowed actions in each state.
