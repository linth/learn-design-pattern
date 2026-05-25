'''
樣板方法模式 - 具體子類別範例 (Refactoring Guru)
實作抽象方法，並可選擇性地覆寫掛鉤。
'''

from AbstractClass import AbstractClass


class ConcreteClass1(AbstractClass):
    '''[具體類別 1] 實作所有抽象方法'''

    def required_operations1(self) -> None:
        print('ConcreteClass1: 實作 required_operations1')

    def required_operations2(self) -> None:
        print('ConcreteClass1: 實作 required_operations2')


class ConcreteClass2(AbstractClass):
    '''[具體類別 2] 實作抽象方法，並覆寫掛鉤'''

    def required_operations1(self) -> None:
        print('ConcreteClass2: 實作 required_operations1')

    def required_operations2(self) -> None:
        print('ConcreteClass2: 實作 required_operations2')

    def hook1(self) -> None:
        print('ConcreteClass2: 覆寫 hook1，加入額外行為')
