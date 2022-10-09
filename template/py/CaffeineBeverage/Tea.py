from .CaffeineBeverage import CaffeineBeverage


class Tea(CaffeineBeverage):
    # def __init__(self):
    #     pass

    def prepare_recipe(self):
        self.boil_water()
        self.steep_tea_bag()
        self.pour_in_cup()
        self.add_lemon()

    def steep_tea_bag(self):
        print('steep_tea_bag')

    def add_lemon(self):
        print('add_lemon')
