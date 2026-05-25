'''CaffeineBeverage 抽象基底類別（樣板方法模式）'''

class CaffeineBeverage:
    """
    [抽象超類別] 含咖啡因飲料基底
    定義了製作飲料的標準作業流程（SOP）。
    """

    def __init__(self):
        pass

    def prepare_recipe(self):
        """樣板方法：定義製作飲料的演算法骨架，子類別不應覆寫此方法"""
        self.boil_water()     # 步驟 1：煮水（共用）
        self.brew()            # 步驟 2：沖泡（由子類別實作）
        self.pour_in_cup()     # 步驟 3：倒入杯子（共用）
        if self.customer_wants_condiments():
            self.add_condiments()  # 步驟 4：加配料（由子類別實作，透過 Hook 控制）

    def boil_water(self):
        '''共用邏輯：煮水'''
        print('煮水...')

    def pour_in_cup(self):
        '''共用邏輯：倒入杯子'''
        print('將飲料倒入杯中...')

    def brew(self):
        '''抽象方法：具體沖泡方式，由子類別實作'''
        pass

    def add_condiments(self):
        '''抽象方法：具體配料，由子類別實作'''
        pass

    def customer_wants_condiments(self):
        """
        掛鉤 (Hook)
        預設為 True（要加配料），子類別可覆寫此方法改變流程。
        """
        return True
