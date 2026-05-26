'''
獨體模式 (Singleton Pattern)

核心概念：
- 確保一個類別只有一個實例，並提供全域存取點。
- 透過 __new__ 方法控制實例的建立。

實作方式：
1. 基本版：複寫 __new__ 保證唯一實例
2. 裝飾器版：使用 @singleton 裝飾器
3. 模組級別：Python 模組本身就是 Singleton
'''


# ============================================================
# 實作 1：基本版（複寫 __new__）
# ============================================================

class Singleton:
    '''最基本的方式：複寫 __new__ 方法控制實例建立'''

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.initialized = True

    def some_method(self):
        print('Singleton 方法被呼叫')


# ============================================================
# 實作 2：裝飾器版
# ============================================================

def singleton(cls):
    '''裝飾器：將任何類別變成 Singleton'''
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance


@singleton
class Config:
    '''使用裝飾器的 Singleton 設定管理類別'''

    def __init__(self):
        self._config = {}

    def set(self, key: str, value: str) -> None:
        self._config[key] = value

    def get(self, key: str) -> str | None:
        return self._config.get(key)


# ============================================================
# 實作 3：模組級別 Singleton
# Python 模組在第一次 import 時只會執行一次，本身就是天然 Singleton
# 直接在全域建立實例，任何地方 import 都是同一個物件
# ============================================================

class _Logger:
    '''日誌記錄器 - 建議使用此方式（模組級別 Singleton）'''

    def __init__(self):
        self._logs: list[str] = []

    def info(self, message: str) -> None:
        line = f'[INFO] {message}'
        self._logs.append(line)
        print(line)

    def error(self, message: str) -> None:
        line = f'[ERROR] {message}'
        self._logs.append(line)
        print(line)


# 在模組層級建立唯一實例，import 時只會執行一次
logger = _Logger()


# ============================================================
# 使用範例
# ============================================================

if __name__ == '__main__':
    # 基本版
    print('=== 基本版 Singleton ===')
    s1 = Singleton()
    s2 = Singleton()
    print(f's1 is s2 ? {s1 is s2}')  # True
    s1.some_method()

    # 裝飾器版
    print('\n=== 裝飾器版 Singleton ===')
    c1 = Config()
    c2 = Config()
    print(f'c1 is c2 ? {c1 is c2}')  # True
    c1.set('host', 'localhost')
    print(f"c2.get('host') = {c2.get('host')}")  # localhost

    # 模組級別 Singleton
    print('\n=== 模組級別 Singleton ===')
    logger.info('應用程式啟動')
    logger.error('發生錯誤')
