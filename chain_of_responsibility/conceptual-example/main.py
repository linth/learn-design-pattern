'''
Chain of Responsibility design pattern - main


Reference:
    - https://refactoring.guru/design-patterns/chain-of-responsibility/python/example
'''
from Handler import MonkeyHandler, SquirrelHandler, DogHandler, client_code


if __name__ == "__main__":
    monkey = MonkeyHandler()
    squirrel = SquirrelHandler()
    dog = DogHandler()

    monkey.set_next(squirrel).set_next(dog)

    # The client should be able to send a request to any handler, not just the
    # first one in the chain.
    print("Chain: Monkey > Squirrel > Dog")
    client_code(monkey)
    print("\n")

    print("Subchain: Squirrel > Dog")
    client_code(squirrel)