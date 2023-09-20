'''
mediator design pattern example.

Reference:
  - https://medium.com/@som.mukhopadhyay/mediator-design-pattern-in-python-7f5cd9890f05
'''

from abc import ABC, abstractmethod


class ClassMonitor(ABC):
    pass
  
class ConcreteClassMonitor(ClassMonitor):
  
    def __init__(self, student1, student2) -> None:
        self.student1 = student1
        self.student2 = student2
        
    def notify(self, sender, event):
        if event == 'A':
            self.student2.do_c()
        elif event == 'D':
            self.student1.do_b()
            self.student2.do_c()
            
            
class BaseStudent:
    def __init__(self, monitor) -> None:
        self._monitor = monitor

    def getMonitorr(self):
        return self._monitor
      
    def setMonitor(self, monitor) -> None:
        self._monitor = monitor
        

class Ridit(BaseStudent):
    def do_a(self):
        print("Ridit does A.")
        self._monitor.notify(self, "A")

    def do_b(self):
        print("Ridit does B.")
        self._monitor.notify(self, "B")


class Rajdeep(BaseStudent):
    def do_c(self):
        print("Rajdeep does C.")
        self._monitor.notify(self, "C")

    def do_d(self):
        print("Rajdeep does D")
        self._monitor.notify(self, "D")
        
        
if __name__ == '__main__':
    ridit = Ridit(None)
    rajdeep = Rajdeep(None)
    classMonitor = ConcreteClassMonitor(ridit,rajdeep)
    ridit.setMonitor(classMonitor)
    rajdeep.setMonitor(classMonitor)

    print("Ma'am asks Ridit to do A")
    ridit.do_a()

    print("Ma'am asks Rajdeep to do  D.")
    rajdeep.do_d()