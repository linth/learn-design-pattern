'''
本範例使用繼承方式實作


合成/聚合複用原則 (Composite/Aggregate Reuse Principle)
    - 盡量使用組合(contains-a)/聚合(has-a)方式來代替繼承(is-a)來達到重複使用的目的。
    - 主要目的在於當要重複使用套件時，應該先考慮使用組合/聚合的方式，其次才是繼承。
    - 而如果要使用繼承的話，則須符合里氏替換原則(LSP)

合成/聚合差異性:
    - 聚合：班級與學生 (有點類似關係概念)
    - 合成：人與器官 (有點類似集合概念)


合成/聚合跟繼承差異性:
    - 封裝性
        - 繼承時父類別的實作細節會暴露給子類別，所以繼承會破壞類別的封裝。而由於父類別對子類別是透明的，所以繼承又稱做白箱複用。
        - 合成/聚合時使用的類別並不知道原始類別的實作細節，所以維持了類別的封裝性，又稱做黑箱複用。
    - 耦合度
        - 繼承時父類別與子類別的耦合度高。若父類別做任何更動都會影響到子類別，降低了類別的擴充及維護。
        - 合成/聚合時新舊類別的耦合度及依賴程度低，新類別只能透過複用類別的接口取得內容。
    - 靈活性
        - 繼承限制了整體的靈活性。由於從父類別繼承下來的實作是靜態的，不可能在執行時發生變化。
        - 合成/聚合的靈活性較高。合成/聚合執行時，新類別可以自由的引用與組合類別相同的對象。

'''
from abc import ABC, abstractmethod


class Car(ABC):    
    @abstractmethod
    def run(self):
        pass

# 電動車
class ElectricCar(Car):    
    def run(self):
        print(f'this is a electric car.')
        

# 汽油車
class PetrolCar(Car):    
    def run(self):
        print(f'this is a petrol car.')


class BlackElectricCar(ElectricCar):
    def appearance(self):
        print('black color.')
        super().run()
        

class BlackPetrolCar(PetrolCar):
    def appearance(self):
        print('black color.')
        super().run()
        

class WhiteElectricCar(ElectricCar):
    def appearance(self):
        print('white color.')
        super().run()


class WhitePetrolCar(PetrolCar):
    def appearance(self):
        print('white color.')
        super().run()
        
        
if __name__ == '__main__':
    
    '''
    Analysis:
        - 封裝性
            - 封裝性不用講，繼承的封裝性對子類別來說一定是透明的。
        - 耦合性
            - 電動/汽油車繼承汽車，不同種顏色的車載分別繼承電動/汽油車，耦合性相當的高
        - 靈活性
            - 每當我想要某一個車種，我就必須直接建立該顏色車種的物件，相當的不方便。
    '''
    
    we = WhiteElectricCar()
    we.appearance()
    
    