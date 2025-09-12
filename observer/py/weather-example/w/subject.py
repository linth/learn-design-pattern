from abc import ABC, abstractmethod 

# 抽象主題 (Subject)
class Subject(ABC):
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        # 新增
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        # 刪除
        try:
            self._observers.remove(observer)
        except ValueError:
            pass

    def notify(self):
        # 通知
        for observer in self._observers:
            observer.update(self)


