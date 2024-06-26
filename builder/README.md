# builder 設計模式
> 跟 pipeline pattern有點類似
> 使用 builder 可以使用類似chain方式串接步驟, 可讀性跟維護性較高。

## 實際案例

第一版使用builder設計:
```
operation (tasks) -> process -> pipeline
```

### operation

> 可視為任務，任務操作可以是簡單的，也可以是複雜的，

操作通常指的是執行單個任務或動作的過程。在軟體開發中，操作可以是任何需要執行的功能或行為，例如對資料的處理、計算、轉換、驗證等。操作可以是簡單的，也可以是複雜的，它們通常被設計成可重複使用的單元，以便在不同的上下文中多次調用。操作的設計和實現通常關注於其輸入、處理邏輯和輸出。操作可以獨立存在，也可以作為更大的過程或流水線的一部分。

### process

> 由多個operation串接的有序組合

流程通常指的是一系列操作或任務的有序組合，它們按照特定的順序執行以完成某個功能或任務。流程可以由一個或多個操作組成，這些操作可能相互依賴，需要按照特定的順序執行。流程的設計和實現通常關注於操作的執行順序、結果和可能的狀態轉換。流程可以是簡單的，也可以是複雜的，它們可以被設計成可重複使用的單元，以便在不同的應用場景中多次調用。

### pipeline

> 由多個operation和process串接的組合

流水線通常指的是將多個處理單元連接在一起，形成一個數據處理流程的結構。每個處理單元負責執行特定的任務，處理單元之間通過管道（pipeline）連接起來，使得數據可以在不同的處理單元之間流動。流水線的設計和實現主要關注於數據的流動和處理，以及處理單元之間的協作和通信。流水線可以用於將複雜的任務分解為多個子任務，並通過並行執行提高處理效率。在軟體開發中，流水線通常用於處理數據流，例如數據轉換、過濾、排序等。



# Reference
- [[Software Architecture] The Pipeline Design Pattern — From Zero to Hero](https://scribe.rip/@bonnotguillaume/software-architecture-the-pipeline-design-pattern-from-zero-to-hero-b5c43d8a4e60)
- [refactoring.guru - Builder](https://refactoring.guru/design-patterns/builder)