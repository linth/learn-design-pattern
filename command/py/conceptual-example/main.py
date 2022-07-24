'''
Command design pattern - main


Reference:
    - https://refactoring.guru/design-patterns/command/python/example
'''
from CommandInterface import SimpleCommand, ComplexCommand
from CommandInterface import Invoker, Receiver


if __name__ == "__main__":
    '''
    The client code can parameterize an invoker with any commands.
    '''

    invoker = Invoker()
    invoker.set_on_start(SimpleCommand("Say Hi!"))
    receiver = Receiver()
    invoker.set_on_finish(ComplexCommand(receiver, "Send email", "Save report"))

    invoker.do_something_important()
    
