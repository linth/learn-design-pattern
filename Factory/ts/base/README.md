# Factory method
> Factory Method 是一種常見的設計模式，它通常用於創建具有相同接口的物件，但具體實現可能不同的情況下。


## Solution

The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Don’t worry: the objects are still created via the new operator, but it’s being called from within the factory method. Objects returned by a factory method are often referred to as products.



# Reference
- [Factory Method](https://refactoring.guru/design-patterns/factory-method)