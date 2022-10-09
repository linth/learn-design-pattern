# TODO: thinking about the design pattern: adaptor can be used which situations.


class A:
    def __init__(self, d: dict):
        self.d = d

    def showA(self, **kwargs):
        print('This is A class: showA function.')
        # print('kwargs=>', kwargs)
        # self.d = kwargs
        # print('d=>', self.d)
        for i in self.d:
            print(i, self.d[i])

    def convert_to(self):
        print('this is a class A: convert_to function.')
        print(self.d)


class B:
    def showB(self):
        print('This is B class: showB function.')


class C(A, B):
    def showA(self, **kwargs):
        print('This is C class: showA function.')
        for i in kwargs.keys():
            print(i, kwargs[i])


def show_info(a: A):
    """
    you can use abstract class as argument into the function.
    :param a:
    :return:
    """
    a.showA()


class D:
    def covert_to(self, obj: A):
        obj.convert_to()


if __name__ == '__main__':

    d = {'name': 'george', 'age': 36, 'id': 'F001'}
    a = A(d)
    print('a class: ', a.d)
    show_info(a)

    b = B()
    b.showB()

    c = C(d)
    show_info(c)

    d = D()
    d.covert_to(a)
