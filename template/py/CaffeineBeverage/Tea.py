'''茶類別 - 樣板方法模式具體實作'''

from CaffeineBeverage import CaffeineBeverage


class Tea(CaffeineBeverage):
    '''[具體類別] 茶'''

    def __init__(self, wants_lemon=True):
        self._wants_lemon = wants_lemon

    def brew(self):
        print('浸泡茶包')

    def add_condiments(self):
        print('加入檸檬片')

    def customer_wants_condiments(self):
        '''覆寫掛鉤：根據建構參數決定是否加檸檬'''
        return self._wants_lemon
