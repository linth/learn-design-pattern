'''
介面隔離 (Interface Segregation Principle, ISP)
    - 客戶不應該被強迫依賴他們不使用的方法
    - 使用介面隔離，可以隔離區分不同的實作需求。

SRP與ISP的差異:
    - SRP的目的在於一個模組只能有承擔一個責任。
    - ISP的目的在於不強迫實作的類別實作不需要的function。

SRP與ISP設計角度差異:
    - SRP注重的是設計層面，如何劃分功能的歸類，讓程式方便維護及擴充。
    - ISP則是注重在客戶端層面，認為只需要呈現客戶端所需要的功能即可。

Reference:
    - https://ithelp.ithome.com.tw/articles/10236094
'''
from abc import ABC, abstractmethod


# 建立多個 abstract class
class TechSkill(ABC):
    @abstractmethod
    def code(self):
        pass
    
    @abstractmethod
    def debug(self):
        pass
    

class OtherSkill(ABC):
    @abstractmethod
    def prepare_slides(self):
        pass
    

class SeniorEngineer(TechSkill, OtherSkill): # 多重繼承
    def code(self):
        print('coding by senior engineer.')
        
    def debug(self):
        print('debugging by senior engineer.')
        
    def prepare_slides(self):
        print('prepare_slides by senior engineer.')


class JuniorEngineer(TechSkill):
    def code(self):
        print('coding by senior engineer.')
        
    def debug(self):
        print('debugging by senior engineer.')
        
        
if __name__ == '__main__':
    
    se = SeniorEngineer()
    je = JuniorEngineer()
    
    se.code()
    se.debug()
    se.prepare_slides()
    
    je.code()
    je.debug()
    # je.prepare_slides() # junior engineer don't need this skill.