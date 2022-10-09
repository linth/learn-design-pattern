'''
References:
    - https://github.com/luyangkk/python-design-patterns/blob/master/factory/pizzas.py
'''


class Pizza:
    def __init__(self):
        if self.__class__ == Pizza:
            raise (NotImplementedError, 'Cannot create object of class Pizza.')
        self._name = ''
        self._dough = ''
        self._sauce = ''
        self._topping = []

    def get_name(self):
        return self._name

    def prepare(self):
        print('Preparing the {}'.format(self._name))

    def bake(self):
        print('Baking the {}'.format(self._name))

    def cut(self):
        print('Cutting the {}'.format(self._name))

    def box(self):
        print('Boxing the {}'.format(self._name))


class CheesePizza(Pizza):
    def __init__(self):
        Pizza.__init__(self)
        # self._name = 'Pepperoni Pizza'
        self._name = 'Cheese Pizza'
        self._dough = 'Crust'
        self._sauce = 'Marinara Sauce'
        self._topping.append('Sliced Pepperoni')
        self._topping.append('Sliced Onion')
        self._topping.append('Grated Parmesan Cheese')


class PepperoniPizza(Pizza):
    def __init__(self):
        Pizza.__init__(self)
        self._name = 'Pepperoni Pizza'
        self._dough = 'Crust'
        self._sauce = 'Marinara Sauce'
        self._topping.append('Sliced Pepperoni')
        self._topping.append('Sliced Onion')
        self._topping.append('Grated Parmesan Cheese')


class ClamPizza(Pizza):
    def __init__(self):
        Pizza.__init__(self)
        self._name = 'Clam Pizza'
        self._dough = 'Thin Crust'
        self._sauce = 'White Garlic Sauce'
        self._topping.append('Clams')
        self._topping.append('Grated Parmesan Cheese')


class VeggiePizza(Pizza):
    def __init__(self):
        Pizza.__init__(self)
        self._name = 'Veggie Pizza'
        self._dough = 'Crust'
        self._sauce = 'Marinara Sauce'
        self._topping.append('Shredded Mozzarella')
        self._topping.append('Grated Parmesan')
        self._topping.append('Diced Onion')
        self._topping.append('Sliced Mushrooms')
        self._topping.append('Sliced Red Pepper')
        self._topping.append('Sliced Black Olives')


class SimplePizzaFactory:
    def create_pizza(self, pizza_type):
        pizza = None
        if pizza_type == 'cheese':
            pizza = CheesePizza()
        elif pizza_type == 'pepperoni':
            pizza = PepperoniPizza()
        elif pizza_type == 'clam':
            pizza = ClamPizza()
        elif pizza_type == 'veggie':
            pizza = VeggiePizza()
        return pizza


class PizzaStore:
    def __init__(self, factory):
        self.__factory = factory

    def order_pizza(self, pizza_type):
        pizza = self.__factory.create_pizza(pizza_type)
        pizza.prepare()
        pizza.bake()
        pizza.cut()
        pizza.box()
        return pizza


if __name__ == '__main__':
    factory = SimplePizzaFactory()
    store = PizzaStore(factory)

    pizza = store.order_pizza('cheese')
    print('We order a {}'.format(pizza.get_name()))

    pizza = store.order_pizza('veggie')
    print('We order a {}'.format(pizza.get_name()))
