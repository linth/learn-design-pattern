from design_pattern.head_first_design_pattern.template_method_pattern.CaffeineBeverage.CaffeineBeverage import CaffeineBeverage


class Coffee(CaffeineBeverage):
    def __init__(self):
        pass

    def prepare_recipe(self):
        self.boil_water()
        self.brew_coffee_grinds()
        self.pour_in_cup()
        self.add_sugar_and_milk()
        self.hook()
        if self.customer_want_conditions() is True:
            """
            如果客戶想要加配料，才會呼叫。
            """
            self.addCondiments()

    def brew_coffee_grinds(self):
        print('brew_coffee_grinds')

    def add_sugar_and_milk(self):
        print('add_sugar_and_milk')

    def hook(self):
        """
        預設不做事的具象方法，稱為hook (掛勾)。
        次類別可以視情況決定要不要利用override的方式來覆蓋。
        """
        pass

    def customer_want_conditions(self):
        return True

    def addCondiments(self):
        print('addCondiments...')


class BlueMountainCoffee(Coffee):
    def hook(self):
        print('end of hook...')


class Latte(Coffee):
    def customer_want_conditions(self):
        return False