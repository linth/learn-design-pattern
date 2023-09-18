'''
combination with mediator and build design pattern.

Reference:
  - https://ianjustin39.github.io/ianlife/design-pattern/mediator-pattern/
'''
import logging

logging.basicConfig(
    # filename='mediator-build-combine.py', 
    encoding='utf-8',
    level=logging.DEBUG
  )


class Mediator:
  def __init__(self) -> None:
    self.components = []
    self.logger = logging.getLogger(self.__class__.__name__)
    
  def add_component(self, component):
    self.components.append(component)
    return self
    
  def notify(self, sender, event):
    for component in self.components:
      if component != sender:
        component.receive(event)
        
        
class Component:
  def __init__(self, mediator: Mediator) -> None:
    self.mediator = mediator
    self.logger = logging.getLogger(self.__class__.__name__)
    
  def send(self, event):
    self.mediator.notify(self, event)

  def receive(self, event):
    pass
  
# 收到事件: info, 做某件事情: warn
class ConcreteComponent1(Component):
    def receive(self, event):
        self.logger.info('ConcreteComponent1 收到事件')
        
    def send(self, event):
        self.logger.warning('ConcreteComponent1 送出封包')
        return super().send(event)
        
        
class ConcreteComponent2(Component):
    def receive(self, event):
        self.logger.info('ConcreteComponent2 收到事件')
      
    def send(self, event):
        self.logger.warning('ConcreteComponent2 送出封包')
        return super().send(event)
        
        
if __name__ == "__main__":
      
    mediator = Mediator()

    component1 = ConcreteComponent1(mediator)
    component2 = ConcreteComponent2(mediator)

    mediator.add_component(component1) \
      .add_component(component2)

    component1.send("Hello from Component 1")
    component2.send("Hi from Component 2")
    