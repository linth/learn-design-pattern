'''
Builder design pattern.


References:
    - https://refactoring.guru/design-patterns/builder/python/example
'''
# Computer class 專門儲存屬性、資料
class Computer:
    def __init__(self, serial_number):
        self.serial_number = serial_number
        self.memory = None
        self.hdd = None
        self.gpu = None

    def __str__(self):
        info = f'Memory: {self.memory} GB, ' \
               f'Hard Disk: {self.hdd} GB, ' \
               f'Graphics Card: {self.gpu}.'
        return info


# 專門 set/get Computer builder class.
class ComputerBuilder:
    def __init__(self):
        self.computer = Computer('A12345678')

    def config_memory(self, memory):
        self.computer.memory = memory

    def config_hdd(self, hdd):
        self.computer.hdd = hdd

    def config_gpu(self, gpu):
        self.computer.gpu = gpu


# 使用外部 class 來進行呼叫 Computer builder class.
class HardwareEngineer:
    def __init__(self):
        self.builder = None

    def construct_computer(self, memory, hdd, gpu):
        self.builder = ComputerBuilder()
        res = [i for i in (self.builder.config_memory(memory),
                           self.builder.config_hdd(hdd),
                           self.builder.config_gpu(gpu))]

    def computer(self):
        return self.builder.computer


def main():
    engineer = HardwareEngineer()
    engineer.construct_computer(hdd=500, memory=8, gpu='GeForce GTX 650 Ti')
    computer = engineer.computer()
    print(computer)
    

if __name__ == '__main__':
    main()