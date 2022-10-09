from abc import ABC, abstractmethod
from typing import Generic, Optional, TypeVar

S = TypeVar("S")


class IeObserverDelegate(ABC):
    """ delegate class for observer. """
    def on_changed(self, new_value: S):
        raise NotImplementedError('on_changed() must be overridden.')


class IeAbsLiveData(Generic[S], ABC):
    def __init__(self):
        self._raw_data = object()
        self.observer_dict = dict()
        self.data = self._raw_data

    def reset_value(self):
        self.data = self._raw_data

    def set_value(self, value: S):
        if value is None:
            return
        if value == self._raw_data:
            return
        self.data = value
        print('IeAbsLiveData#set_value - value: {}'.format(value))
        print('IeAbsLiveData#set_value - observer_dict.size: {}'.format(len(self.observer_dict)))
        print('IeAbsLiveData#set_value - type of observer_dict: {}'.format(type(self.observer_dict)))

        for tag in self.observer_dict:
            print(f'IeAbsLiveData#set_value - type of tag: {type(tag)}')
            self.observer_dict[tag].on_changed(self.data)

    def observe(self, observer: IeObserverDelegate, tag: str):
        if tag is None:
            return
        if len(tag) <= 0:
            return
        self.observer_dict[tag] = observer
        print(f'IeAbsLiveData#observe - add observer for tag: {tag}')
        print(f'IeAbsLiveData#observe - type of self.observer_dict[tag]: {type(self.observer_dict[tag])}')

    def remove_observer(self, tag: str):
        if tag is None:
            return
        if len(tag) <= 0:
            return
        if tag in self.observer_dict:
            del self.observer_dict[tag]


class FooLiveData(IeAbsLiveData):
    def __init__(self):
        super().__init__()


class QooWrapper:
    def __init__(self, data: int):
        self.data = data


class FooObserver(IeObserverDelegate):
    def on_changed(self, new_value: S):
        print(f'FooObserver#on_changed')


def main():
    foo_live_data = FooLiveData()
    foo_live_data.observe(FooObserver(), "Foo")
    foo_live_data.set_value(QooWrapper(10))
    foo_live_data.set_value(10)


if __name__ == '__main__':
    main()


