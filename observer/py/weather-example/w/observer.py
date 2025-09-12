from abc import ABC, abstractmethod 

# 抽象觀察者 (Observer)
class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass
        