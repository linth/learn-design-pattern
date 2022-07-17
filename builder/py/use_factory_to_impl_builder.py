'''
Using factory to implement builder design pattern.
    - Using factory design pattern to implement the scenario:
    - build computer with factory.

Please see "1_computer-builder.py" to understand the design pattern of builder.

Reference:
    - https://medium.com/javarevisited/design-patterns-101-factory-vs-builder-vs-fluent-builder-da2babf42113
'''


MINI14 = '1.4GHz Mac mini'


class AppleFactory:
    class MacMini14:
        def __init__(self, memory, hdd, gpu):
            self.memory = memory
            self.hdd = hdd
            self.gpu = gpu

        def __str__(self):
            return f'Memory: {self.memory}, HDD: {self.hdd}, GPU: {self.gpu}'

    def build_computer(self, model):
        if model == MINI14:
            return self.MacMini14(5, 300, 'Intel Graphics')
        else:
            print(f'I don\'t know how to build {model}')


if __name__ == '__main__':
    a = AppleFactory()
    mac = a.build_computer(MINI14)
    print(mac)