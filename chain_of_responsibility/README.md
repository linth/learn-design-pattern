# Chain of Responsibility design pattern

責任鍊是一種設計模式，可用於通過將復雜的程序流程分解為一系列簡單的步驟來管理它。 在責任鏈中，每個步驟都可以檢查和處理輸入，或將其傳遞給下一步進行處理。 使用責任鏈的常見應用場景包括：

處理複雜的工作流：當一個程序需要多個步驟來完成，並且每個步驟可能需要不同的處理程序時，可以使用責任鏈來管理流程，使其更易於維護和擴展。

應用程序安全檢查：當應用程序需要進行安全檢查時，可以使用責任鏈建立安全檢查流程。 每個處理程序都可以檢查用戶的權限或訪問控制列表，並決定是否允許用戶執行該操作。

異常處理：當程序出現異常時，可以使用責任鏈來處理異常。 每個處理程序都可以捕獲並處理特定類型的異常，如果它無法處理該異常，則可以將其傳遞給下一個處理程序。

日誌記錄：當您需要記錄應用程序時，您可以使用責任鏈創建一個日誌記錄進程。 每個處理程序都可以記錄特定類型的日誌信息並將其傳遞給下一個處理程序。

![](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution1-en.png)


![](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/solution2-en.png)


![](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/structure-indexed.png)


![](https://refactoring.guru/images/patterns/diagrams/chain-of-responsibility/example-en.png)