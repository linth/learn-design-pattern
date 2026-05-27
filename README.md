# learn-design-pattern

自學設計模式的筆記與實作，涵蓋多種語言的程式碼範例（Python、C#、TypeScript、Java）。

## 快速執行

```bash
# TypeScript
npx tsx path/to/example.ts

# Python
python3 path/to/example.py

# Java
java path/to/Example.java

# C# (需有 .csproj 或使用 dotnet-script)
dotnet run --project path/to/
```

## 目錄結構

### 物件導向設計原則

- [x] [SOLID 原則](SOLID/README.md)
  - [Python](SOLID/py/) | [C#](SOLID/cs/) | [TypeScript](SOLID/ts/) | [Java](SOLID/java/)

### Creational Patterns 生成模式
只要牽涉到將物件實體化。這類模式都提供一個方法，將客戶從所需要實體化的物件中鬆綁出來。
- [x] [獨體模式 (Singleton Pattern)](singleton/README.md) — [Python](singleton/py/) · [C#](singleton/cs/) · [TypeScript](singleton/ts/) · [Java](singleton/java/)
  - C# 實務範例：[Logger](singleton/cs/examples/Logger.cs) · [ConfigManager](singleton/cs/examples/ConfigManager.cs) · [DataFilter](singleton/cs/examples/DataFilter.cs) · [DataStatistics](singleton/cs/examples/DataStatistics.cs) · [CacheManager](singleton/cs/examples/CacheManager.cs) · [DatabaseConnectionPool](singleton/cs/examples/DatabaseConnectionPool.cs)
- [x] 工廠方法模式 (Factory Method Pattern) — [Python](Factory/py/) · [C#](Factory/cs/)
- [x] 抽象工廠模式 (Abstract Factory Pattern) — [範例](AbstractFactory/)
- [x] 建立者模式 (Builder Pattern) — [Python](builder/py/) · [C#](builder/cs/) · [TypeScript](builder/ts/)
- [ ] 原型模式 (Prototype Pattern) — [範例](prototype/)

### Structural Patterns 結構模式
讓你合成類別或物件到大型的結構。
- [x] 裝飾者模式 (Decorator Pattern) — [範例](decorator/)
- [x] 轉接器模式 (Adapter Pattern) — [Python](adapter/py/) · [C#](adapter/cs/)
- [x] 表象模式 (Facade Pattern) — [範例](Facade/)
- [x] 合成模式 (Composite Pattern) — [範例](Composite/)
- [x] 代理人模式 (Proxy Pattern) — [範例](proxy/)
- [x] 橋接模式 (Bridge Pattern) — [範例](bridge/)
- [ ] 享元模式 (Flyweight Pattern)

### Behavioral Patterns 行為模式
描述類別和物件如何互動，以及各自的責任。
- [x] [策略模式 (Strategy Pattern)](strategy/README.md) — [C#](strategy/cs/) · [TypeScript](strategy/ts/) · [Java](strategy/java/)
- [x] [樣板方法模式 (Template Method Pattern)](template/README.md) — [C#](template/cs/) · [Python](template/py/) · [TypeScript](template/ts/) · [Java](template/java/)
- [x] 觀察者模式 (Observer Pattern) — [範例](observer/)
- [x] [狀態模式 (State Pattern)](state/README.md) — [Python](state/py/) · [C#](state/cs/) · [TypeScript](state/ts/) · [Java](state/java/)
- [x] [責任鏈模式 (Chain of Responsibility Pattern)](chain_of_responsibility/README.md) — [Python](chain_of_responsibility/py/) · [C#](chain_of_responsibility/cs/) · [TypeScript](chain_of_responsibility/ts/)
- [x] 中介者模式 (Mediator Pattern) — [範例](Mediator/)
- [x] 備忘錄模式 (Memento Pattern) — [範例](memento/)
- [x] 命令模式 (Command Pattern) — [範例](command/)
- [x] 反覆器模式 (Iterator Pattern) — [範例](Iterator/)
- [ ] 解譯器模式 (Interpreter Pattern) — [範例](interpreter/)
- [ ] 訪問者模式 (Visitor Pattern)

### 其他設計模式與架構

- [x] [Fluent Query Builder](Fluent%20Query%20Builder/README.md) — 流暢查詢建構器
  - [Python](Fluent%20Query%20Builder/py/) · [C#](Fluent%20Query%20Builder/cs/) · [TypeScript](Fluent%20Query%20Builder/ts/)
- [x] [Specification Pattern](Specification%20Pattern/README.md) — 規格模式：商務規則組合
  - [Python](Specification%20Pattern/py/) · [C#](Specification%20Pattern/cs/) · [TypeScript](Specification%20Pattern/ts/)
- [x] 事件匯流排 (Event Bus) — [範例](eventbus/)
- [x] 發佈訂閱模式 (Pub-Sub) — [範例](Pub-Sub/)
- [x] 依賴注入 (Dependency Injection) — [範例](dependency-injection-demo/)
- [x] 儲存庫模式 (Repository Pattern) — [範例](Repository-Design-Pattern/)
- [x] DTO 模式 (Data Transfer Object) — [範例](DTODesign/)
- [x] 轉接器模式 (Convert) — [範例](convert/)
- [x] 聚合模式 (Aggregator) — [範例](Aggregator/)
- [x] 代理模式 (Agent) — [範例](Agent/)
- [x] 迪米特法則 (Law of Demeter) — [範例](Law_of_Demeter/)

## Reference
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [youtube - 10 Architecture Patterns Used In Enterprise Software Development Today](https://www.youtube.com/watch?v=BrT3AO8bVQY)
- [10 of the Most Used Design Patterns in TypeScript](https://blog.stackademic.com/10-of-the-most-used-design-patterns-in-typescript-0dd52a16db99)
- http://corrupt003-design-pattern.blogspot.com/2017/02/blog-post.html