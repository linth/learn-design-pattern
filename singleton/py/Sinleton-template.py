

class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'): 
            self.initialized = True
            
    def some_method(self):
        print('Sington method called.')
        

if __name__ == '__main__':
    s1 = Singleton()
    s2 = Singleton()
       
    print(s1 is s2) # False
    print(s1.some_method() is s2.some_method()) # True
    print(s1.initialized, s2.initialized) # True, True 
    
    