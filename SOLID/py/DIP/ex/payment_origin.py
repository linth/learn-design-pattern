'''
依賴反轉 (Dependency Inversion Principle, DIP)
    - High-level modules should not depend on low-level modules. Both should depend on abstractions. (高層模組不應該依賴低層模組，兩者皆應依賴於抽象。)
    - Abstractions should not depend on details. Details should depend on abstractions. (抽象不應該依賴細節，細節應該依賴於抽象。)
    - 高層低層是相對關係，其實也就是呼叫者與被呼叫者。而細節指的是具體的實作，相較於抽象的穩定，細節的變化較多。


優點
    - 减少class間的耦合性，提高系统的穩定性
    - 降低開發時的風險
    - 提高系統可讀及維護性

Reference:
    - https://ithelp.ithome.com.tw/articles/10236359
    - https://www.jyt0532.com/2020/03/24/dip/
    - https://medium.com/@yhosutun2491/design-pattern-%E4%BE%9D%E8%B3%B4%E5%8F%8D%E8%BD%89%E5%8E%9F%E5%89%87-dependency-inversion-principle-dip-725f29deca6f
    - https://www.appcoda.com.tw/dependency-inversion-principle/
'''

class Payment:
    def __init__(self):
        pass
    
    def pay(self, creditCard: CreditCard):
        creditCard.pay()
    

class CreditCard:
    def pay(self):
        print(f'payment by credit card.')
        
        
if __name__ == '__main__':
    cc = CreditCard()    
    p = Payment()
    p.pay(cc)
    