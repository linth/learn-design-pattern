'''
Law of Demeter 
  - account and customer example.

'''

class Account:
    def __init__(self, balance):
        self.balance = balance
    
    def deposit(self, amount):
        self.balance += amount
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
    
    def getBalance(self):
        return self.balance


class BankServer:
    def __init__(self):
        self.accounts = {}
    
    def addAccount(self, account):
        self.accounts[account] = account.getBalance()
    
    def getAccountBalance(self, account):
        return self.accounts[account]


class Customer:
    def __init__(self, name, account):
        self.name = name
        self.account = account
    
    def getBalance(self, server):
        return server.getAccountBalance(self.account)
