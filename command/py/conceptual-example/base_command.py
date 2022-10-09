'''
command-line design pattern.


Reference:
    - https://www.geeksforgeeks.org/command-method-python-design-patterns/
    - https://learncsdesign.medium.com/learn-the-command-design-pattern-60cad5b85e34
'''
from abc import ABC, abstractmethod


class Command(ABC):
    # interface, abstract class.
    def init(self, receiver):
        self.receiver = receiver
        
    def process(self):
        pass


class CommandImplementation(Command):
    # 實作 abstract class for command.
    def __init__(self, receiver):
        self.receiver = receiver
        
    def process(self):
        self.receiver.perform_action()


class Receiver:
    # 接收者
    def perform_action(self):
        print('action performed in receiver.')
        

class Invoker:
    # 調用者
    def command(self, cmd):
        self.cmd = cmd
        
    def execute(self):
        self.cmd.process()
        
        
if __name__ == '__main__':
    receiver = Receiver() # 接收端
    cmd = CommandImplementation(receiver) # command 命令
    
    invoker = Invoker()
    invoker.command(cmd)
    invoker.execute()