'''
樣板方法模式 - 抽象超類別範例 (Refactoring Guru)
定義演算法骨架，將部分步驟延遲到子類別實作。
'''

from abc import ABC, abstractmethod


class AbstractClass(ABC):
    """
    [抽象超類別] 定義了樣板方法與基本操作。
    子類別必須實作抽象方法，並可選擇性地覆寫掛鉤。
    """

    def template_method(self) -> None:
        """
        樣板方法：定義演算法骨架。
        由固定步驟（base operations）與可變步驟（abstract operations）組成。
        """
        self.base_operation1()
        self.required_operations1()
        self.base_operation2()
        self.hook1()
        self.required_operations2()
        self.base_operation3()
        self.hook2()

    # ---------- 共用邏輯（所有子類別相同）----------

    def base_operation1(self) -> None:
        print('AbstractClass: 執行基礎操作 1')

    def base_operation2(self) -> None:
        print('AbstractClass: 執行基礎操作 2')

    def base_operation3(self) -> None:
        print('AbstractClass: 執行基礎操作 3')

    # ---------- 抽象方法（子類別必須實作）----------

    @abstractmethod
    def required_operations1(self) -> None:
        pass

    @abstractmethod
    def required_operations2(self) -> None:
        pass

    # ---------- 掛鉤（子類別可選擇性覆寫）----------

    def hook1(self) -> None:
        '''掛鉤 1：預設為空，子類別可覆寫'''
        pass

    def hook2(self) -> None:
        '''掛鉤 2：預設為空，子類別可覆寫'''
        pass
