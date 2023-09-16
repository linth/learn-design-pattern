'''
Mediator design pattern


Reference:
  - https://ianjustin39.github.io/ianlife/design-pattern/mediator-pattern/
'''

class Mediator:
  def __init__(self) -> None:
      self.components = []
    
  def add_component(self, component):
      self.components.append(component)

  def notify(self, sender, event):
      for component in self.components:
          if component != sender:
                component.receive(event)



class Component:
    def __init__(self, mediator):
        self.mediator = mediator

    def send(self, event):
        self.mediator.notify(self, event)

    def receive(self, event):
        pass
      

class ConcreteComponent1(Component):
    def receive(self, event):
        print("ConcreteComponent1收到事件:", event)


class ConcreteComponent2(Component):
    def receive(self, event):
        print("ConcreteComponent2收到事件:", event)
        


if __name__ == "__main__":
    mediator = Mediator()

    component1 = ConcreteComponent1(mediator)
    component2 = ConcreteComponent2(mediator)

    mediator.add_component(component1)
    mediator.add_component(component2)

    component1.send("Hello from Component 1")
    component2.send("Hi from Component 2")

      
      