'''咖啡類別 - 樣板方法模式具體實作'''

from CaffeineBeverage import CaffeineBeverage


class Coffee(CaffeineBeverage):
    '''[具體類別] 咖啡'''

    def brew(self):
        print('透過濾網滴濾咖啡豆萃取液')

    def add_condiments(self):
        print('加入糖與牛奶')

    def customer_wants_condiments(self):
        '''覆寫掛鉤：詢問使用者是否要加糖與牛奶'''
        answer = input('請問要加糖與牛奶嗎？(y/n) ')
        return answer.lower() == 'y'


class BlueMountainCoffee(Coffee):
    '''[具體類別] 藍山咖啡（展示掛鉤的彈性）'''

    def brew(self):
        print('以手沖方式萃取藍山咖啡豆')

    def customer_wants_condiments(self):
        '''藍山咖啡建議喝原味，預設不加料'''
        print('藍山咖啡建議喝原味，不加料')
        return False


class Latte(Coffee):
    '''[具體類別] 拿鐵咖啡'''

    def brew(self):
        print('沖煮濃縮咖啡並混合大量熱牛奶')

    def add_condiments(self):
        print('在奶泡上拉花')
