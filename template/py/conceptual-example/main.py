'''樣板方法模式 - 用戶端範例 (Refactoring Guru)'''
from AbstractClass import AbstractClass
from ConcreteClass import ConcreteClass1, ConcreteClass2


def client_code(abstract_class: AbstractClass) -> None:
    """
    用戶端程式碼呼叫樣板方法即可執行完整的演算法，
    不需關心具體子類別的實作細節。
    """
    abstract_class.template_method()


if __name__ == '__main__':
    print('使用 ConcreteClass1:')
    client_code(ConcreteClass1())
    print()

    print('使用 ConcreteClass2:')
    client_code(ConcreteClass2())
