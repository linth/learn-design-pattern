'''

Reference:
    - https://ithelp.ithome.com.tw/articles/10236782
'''
from abc import ABC, abstractmethod


class Color(ABC):
    @abstractmethod
    def kind(self):
        pass
    
    
class Car(ABC):
    
    def __init__(self, color: Color):
        self.color = color
    
    # TODO: 確認 python 實作合成方式為何?
    # color = Color() # 做合成
    
    def run(self):
        pass
    
    def get_color(self):
        return self.color.kind()
    
    def set_color(self, color: Color):
        self.color = color


# 電動車
class ElectricCar(Car):
    def run(self):
        print(f'this is a electric car.')


# 汽油車
class PetrolCar(Car):   
    def run(self):
        print(f'this is a petrol car.')
        

class White(Color):
    def kind(self):
        print('white color')
        
        
class Black(Color):
    def kind(self):
        print('Black color')


if __name__ == '__main__':
    
    white = White()
    block = Black()
    ec = ElectricCar(white)
    
    ec.set_color(block)
    ec.get_color()
    ec.run()
        