# Better Python

這個github作者寫的範例真的非常棒，提供一個很好的練習。

在修改python的程式之前，請先把測試程式優先寫起來，以便後續改寫後確保運作正確。

## 1 - coupling and cohesion (耦合內聚)
- 盡量增加 class，盡量使用 class 拆分你的流程跟功能。
- 讓每個class的功能單純鎖定單一化

## 2 - dependency inversion (依賴反轉)
- 增加 abc class
- 如 class 需要使用其他 class，一般做法會使用 new object()。但是，最優解是使用abc class來取代，遵循使用介面方式來界接，減少程式擴增的修改。

reference: [DIP](https://medium.com/%E7%A8%8B%E5%BC%8F%E6%84%9B%E5%A5%BD%E8%80%85/%E4%BD%BF%E4%BA%BA%E7%98%8B%E7%8B%82%E7%9A%84-solid-%E5%8E%9F%E5%89%87-%E4%BE%9D%E8%B3%B4%E5%8F%8D%E5%90%91%E5%8E%9F%E5%89%87-dependency-inversion-principle-a74ca045d776)

## 3 - strategy pattern (策略模式)
- 建立 abc class 並繼承抽象層產生不同 class，針對程式中有關於一些判斷方法，進行不同的策略跟執行工作。
- 使用 abc class 或是 interface class 進行依賴反向 (Dependency Inversion) 抽象層。
**主要是執行前面兩項的原則，進行範例上的實例demo。**

## 4 - observer pattern

## 5 - unit testing

## 6 - template method & bridge

## 7 - dealing with errors

## 8 - mvc

## 9 - solid


---

結論:
    - 寫測試程式碼
    - 追程式碼 (大致了解有多少 class, 各class之間的關係, uml, ..., etc)
    - 寫註釋、標示bookmarks、標示 todo, error, warning, ..., etc.
    - 



## Reference
    - https://www.youtube.com/playlist?list=PLC0nd42SBTaNuP4iB4L6SJlMaHE71FG6N
    - https://github.com/ArjanCodes/betterpython

