# State Design Pattern - Shop Sale Order System

This project demonstrates the **State Design Pattern** applied to an e-commerce Order System.
The pattern allows an object (the Order) to alter its behavior when its internal state changes. The object will appear to change its class.

## Directory Structure

- `order-state.interface.ts`: Defines the common interface for all states.
- `concrete-states.ts`: Implements the specific behaviors for each state (New, Paid, Shipped, Delivered, Cancelled).
- `order.ts`: The Context class that maintains the current state instance.
- `client.ts`: A demonstration script to show the state transitions.

## States and Transitions

1.  **NewState**
    - Initial state.
    - Can transition to: `PaidState`, `CancelledState`.
2.  **PaidState**
    - Payment received.
    - Can transition to: `ShippedState`, `CancelledState` (with refund).
3.  **ShippedState**
    - Order is on the way.
    - Can transition to: `DeliveredState`.
4.  **DeliveredState**
    - Final state. Success.
5.  **CancelledState**
    - Final state. Terminated.

## How to Run

Ensure you have `ts-node` installed, or compile with `tsc`.

```bash
# Run directly with ts-node
npx ts-node client.ts
```

實務關鍵判斷：什麼時候該用 State Pattern？
✅ 適合
- 狀態 ≥ 3
- 有「不允許的操作」
- 商業流程會成長（加新狀態）
- 想清楚畫得出 State Diagram

❌ 不適合
- 只有 if (status === X)
- 純展示狀態（UI badge）
- CRUD + enum 即可