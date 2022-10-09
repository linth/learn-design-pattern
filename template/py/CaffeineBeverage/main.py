from template.py.CaffeineBeverage.Tea import Tea
from template.py.CaffeineBeverage.Coffee import Coffee, BlueMountainCoffee, Latte

# FIXME: some import issue should be solved ASAP.

class Process:
    def selected_condition(self):
        q = input('Tea or Coffee?')
        print(f'The customer wants a {q}, please.')
        is_milk = input('Would you like milk and sugar with your coffee/tea (y/n)?')
        print(f'your anwser: {is_milk}')
        self.is_tea_or_coffee(stuff=q)

    def is_tea_or_coffee(self, **kwargs):
        if kwargs['stuff'] == 'tea':
            self.make_tea()
        elif kwargs['stuff'] == 'coffee':
            self.make_coffee()
        else:
            print('Not found.')

    def make_coffee(self):
        c = Coffee()
        c.prepare_recipe()

    def make_tea(self):
        t = Tea()
        t.prepare_recipe()


if __name__ == '__main__':
    # b = BlueMountainCoffee()
    # b.prepare_recipe()

    # l = Latte()
    # l.prepare_recipe()

    p = Process()
    p.selected_condition()
