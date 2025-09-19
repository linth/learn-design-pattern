# learn-design-pattern
learn design pattern by myself.


## 編譯單一檔案
```
// 使用 tsc 編譯單一檔案, 這會產生同名的 example.js
tsc example.ts

// javascript
node example.js
```


## 直接執行 ts
```
// 直接執行 ts
npx ts-node example.ts
```


## Creational Patterns, 生成模式
只要牽涉到將物件實體化。這類模式都提供一個方法，將客戶從所需要實體化的物件中鬆綁出來。
- [x] 獨體模式 (Singleton Pattern)
  - [ ] 日誌紀錄器
  - [ ] 配置文件
  - [ ] 數據庫連接池
  - [ ] 暫存
  - [ ] 全域/區域設定
- [x] 工廠方法模式 (Factory Method Pattern)
- [x] 抽象工廠模式 (Abstract Factory Pattern)
  - [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory/python/example#lang-features)
- [x] 建立者模式 (Builder Pattern)
  - [Builder](https://refactoring.guru/design-patterns/builder/python/example#lang-features)
- [ ] 原型模式 (Prototype Pattern)


## 結構模式
讓你合成類別或物件到大型的結構。
- [x] 裝飾者模式 (Decorator Pattern)
- [x] 轉接器模式 (Adapter Pattern)
  - [Adapter](https://refactoring.guru/design-patterns/adapter/python/example#lang-features)
- [ ] 表象模式 (Facade Pattern)
- [ ] 合成模式 (Composite Pattern)
- [x] 代理人模式 (Proxy Pattern)
  - [Proxy](https://refactoring.guru/design-patterns/proxy/typescript/example)
- [ ] 橋接模式 (Bridge Pattern)
- [ ] 享元模式 (Flyweight Pattern)


## Behavioral Patterns, 行為模式
模述類別和物件如何互動，以及各自的責任。
- [x] 策略模式 (Strategy Pattern)
  - [Strategy](https://refactoring.guru/design-patterns/strategy/python/example#lang-features)
- [x] 觀察者模式 (Observer Pattern)
  - [Observer](https://refactoring.guru/design-patterns/observer/python/example#lang-features)
- [ ] 命令模式 (Command Pattern)
  - [Command](https://refactoring.guru/design-patterns/command/python/example#lang-features)
- [ ] 樣板方法模式 (Template Method Pattern)
  - [Template Method](https://refactoring.guru/design-patterns/template-method)
- [ ] 反覆器模式 (Iterator Pattern)
  - [Iterator](https://refactoring.guru/design-patterns/iterator/python/example#lang-features)
- [x] 狀態模式 (State Pattern)
- [x] 責任鏈模式 (Chain of Responsibility Pattern)
  - [Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility/python/)
- [ ] 解譯器模式 (Interpreter Pattern)
- [x] 中介者模式 (Mediator Pattern)
- [x] 備忘錄模式 (Memento Pattern)
- [ ] 訪問者模式 (Visitor Pattern)


# 10 Architecture Patterns Used In Enterprise Software Development
- layered pattern
- pipe-filter pattern
- client-server pattern
- model view controller pattern
- event bus pattern
- microservices architecture
- broker pattern
- peer-to-peer pattern
- blackboard pattern
- master-slave pattern

# Microservices


## Reference
- [youtube - 10 Architecture Patterns Used In Enterprise Software Development Today](https://www.youtube.com/watch?v=BrT3AO8bVQY)
- https://refactoring.guru/design-patterns
- http://corrupt003-design-pattern.blogspot.com/2017/02/blog-post.html
- [10 of the Most Used Design Patterns in TypeScript](https://blog.stackademic.com/10-of-the-most-used-design-patterns-in-typescript-0dd52a16db99)