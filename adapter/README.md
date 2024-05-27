# Adapter

## 使用情境

範例: 電子商務系統中，有個函式 calcuate_total(order)，該函式負責計算訂單的總金額，但卻只能以NT計算，很自然的顧客會需要支援其他流通貨幣，譬如USD或EUR。透過轉接器模式可以不用改變原始碼，進行一層撰寫層 (也稱轉接器)，把資料從給定的NT傳換成USD或EUR。

所以某功能一旦實作完成，再運用轉接器模式讓他能用於新環境，會是比較好的做法，理由如下:
- 不需要取得外部介面的原始碼
- 不會違反開放封閉原則


## [思考] adapter和converter差別?
- adapter: 主要解決接口不兼容的問題, adapter設計專注接口的轉換。
- converter: 不同資料格式或資料結構之間進行轉換, 專注在格式轉換和一致性。


# Reference
- [Adapter Pattern 介紹及 JavaScript 實作](https://medium.com/%E5%93%88%E5%98%8D-%E4%B8%96%E7%95%8C/adapter-pattern-%E4%BB%8B%E7%B4%B9%E5%8F%8A-javascript-%E5%AF%A6%E4%BD%9C-c4f168f1cd26)
- [Adapter Pattern(適配器模式)](https://badgameshow.com/fly/design-pattern-adapter-pattern%E9%81%A9%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F/fly/design-pattern/)
- [Java 設計模式 轉接器模式 Adapter Pattern](https://matthung0807.blogspot.com/2019/11/java-adapter-pattern.html)
- [Java 设计模式 (二) - 适配器模式](https://www.lumin.tech/blog/design-patterns-java-2-adapter/)