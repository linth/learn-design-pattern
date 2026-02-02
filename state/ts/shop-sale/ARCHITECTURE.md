# Architecture: State Design Pattern in Order System

## Overview
The State Design Pattern is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.

In this Shop Sale Order System, we use this pattern to manage the complex logic of order processing, avoiding massive conditional (if-else or switch) statements that are hard to maintain.

## Components

### 1. Context (`Order`)
- The class that clients interact with.
- It maintains a reference to an instance of a `OrderState` subclass, which represents the current state of the Order.
- It delegates all state-specific work to the current state object.

### 2. State Interface (`OrderState`)
- Declares the state-specific methods. These methods make up the public interface of all concrete states.
- Methods: `payOrder`, `shipOrder`, `deliverOrder`, `cancelOrder`.

### 3. Concrete States
- Implement the `OrderState` interface.
- **NewState**: Handles logic when an order is created.
- **PaidState**: Handles logic after payment.
- **ShippedState**: Handles logic during shipping.
- **DeliveredState**: End state for successful orders.
- **CancelledState**: End state for cancelled orders.

## Benefits
- **Single Responsibility Principle**: Group state-specific code into separate classes.
- **Open/Closed Principle**: Introduce new states without changing existing state classes or the context.
- **Simplification**: Removes bulky state machine conditionals from the main `Order` class.
