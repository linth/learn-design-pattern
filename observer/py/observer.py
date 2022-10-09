"""
Goal: learn about the observer of design pattern.

Keyword:
    - observer

Reference:
    - https://refactoringguru.cn/design-patterns/observer/python/example
"""
from abc import ABC, abstractmethod
# from __future__ import annotations
from random import randrange
from typing import List
from twisted.spread.test.test_pb import Observer


class IeColor:
    """ the class is for printing information with color. """
    # color
    pink = '\033[95m'
    blue = '\033[94m'
    success = '\033[92m'
    warning = '\033[93m'
    red = '\033[91m'

    # style
    end = '\033[41;30m' #'\033[0m'
    bold = '\033[1m'
    under_line = '\033[4m'

    """
    examples:
        - add font color.
            30 ~ 37, i.e., \033[30m ~ \033[37m
        - add background color.
            40 ~ 47, i.e., \033[40;37m ~ \033[47;37m
    others:
        \33[0m 關閉所有屬性
        \33[1m 設置高亮度
        \33[4m 下劃線
        \33[5m 閃爍
        \33[7m 反顯
        \33[8m 消隱
        \33[30m -- \33[37m 設置前景色
        \33[40m -- \33[47m 設置背景色
        \33[nA 光標上移n行
        \33[nB 光標下移n行
        \33[nC 光標右移n行
        \33[nD 光標左移n行
        \33[y;xH設置光標位置
        \33[2J 清屏
        \33[K 清除從光標到行尾的內容
        \33[s 保存光標位置
        \33[u 恢復光標位置
        \33[?25l 隱藏光標
        \33[?25h 顯示光標 
    """


class Subject(ABC):
    _state: int = None
    _observers = []

    def attach(self, observer: Observer) -> None:
        pass

    def detach(self, observer: Observer) -> None:
        pass

    def notify(self) -> None:
        pass


class ConcreteSubject(Subject):
    def attach(self, observer: Observer) -> None:
        print(f' {IeColor.red} Subject: Attached an observer.')
        self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        print(f'{IeColor.warning} Subject: Notifying observer...')
        for o in self._observers:
            o.update(self)

    def business_logic(self) -> None:
        print(f' {IeColor.blue} \nSubject: I\'m doing something important.')
        self._state = randrange(0, 10)

        print(f'{IeColor.success} \nSubject: My state has just changed to: {self._state}')
        self.notify()
        

class Observer(ABC):
    def update(self, subject: Subject) -> None:
        pass


class ConcreteObserverA(Observer):
    def update(self, subject: Subject) -> None:
        if subject._state < 3:
            print(f' {IeColor.pink} ConcreteObserverA: Reacted to the event.')


class ConcreteObserverB(Observer):
    def update(self, subject: Subject) -> None:
        if subject._state == 0 or subject._state >= 2:
            print(f' {IeColor.pink} ConcreteObserverB: Reacted to the event.')


if __name__ == '__main__':
    s = ConcreteSubject()

    o1 = ConcreteObserverA()
    s.attach(o1)

    o2 = ConcreteObserverB()
    s.attach(o2)

    s.business_logic()

    s.detach(o1)
    s.business_logic()

