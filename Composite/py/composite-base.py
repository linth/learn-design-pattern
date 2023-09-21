'''
Composite design pattern
  - The Composite design pattern is a structural design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies
'''
from abc import ABC, abstractmethod
import logging

logging.basicConfig(
    # filename='mediator-build-combine.py', 
    encoding='utf-8',
    level=logging.DEBUG
)

# Component
class Graphic(ABC):
  
    @abstractmethod
    def draw(self):
        pass
      
      
# Leaf
class Circle(Graphic):
    def __init__(self, name) -> None:
        self.name = name

    def draw(self):
        # print(f"Drawing circle: {self.name}")
        logging.debug('Drawing circle: %s', self.name)
        
        
# Leaf
class Square(Graphic):
    def __init__(self, name) -> None:
        self.name = name

    def draw(self):
        # print(f"Drawing square: {self.name}")
        logging.debug('Drawing square: %s', self.name)
        
        
# Composite
class CompoundGraphic(Graphic):
    def __init__(self):
        self.children = []

    def add(self, graphic):
        self.children.append(graphic)

    def remove(self, graphic):
        self.children.remove(graphic)

    def draw(self):
        # print("Drawing composite:")
        logging.info('Drawing composite:')
        for child in self.children:
            child.draw()
            
if __name__ == '__main__':
    # Creating leaf graphics
    circle1 = Circle("Circle 1")
    circle2 = Circle("Circle 2")
    square1 = Square("Square 1")
    square2 = Square("Square 2")

    # Creating a composite graphic
    composite = CompoundGraphic()

    # Adding leaf graphics to the composite
    composite.add(circle1)
    composite.add(square1)

    # Creating another composite graphic
    composite2 = CompoundGraphic()

    # Adding leaf graphics and the previous composite to the new composite
    composite2.add(circle2)
    composite2.add(square2)
    composite2.add(composite)

    # Drawing the entire hierarchy
    composite2.draw()
    
    
    '''
    Result:
      Drawing composite:
      Drawing circle: Circle 2
      Drawing square: Square 2
      Drawing composite:      
      Drawing circle: Circle 1
      Drawing square: Square 1
    '''
    