"""
Improved builder design pattern.
    - 結合多個 class (專門儲存屬性、資料, 專門 set/get class)
    - return self 讓設定可以進行 chain function 方便程式撰寫。

References:
    - https://refactoring.guru/design-patterns/builder/python/example
"""

class ComputerBuilder:
    def __init__(self):
        self.serial_number = ""
        self.memory = ""
        self.hdd = ""
        self.gpu = ""

    def config_serial_number(self, serial_number) -> object:
        self.serial_number = serial_number
        return self

    def config_memory(self, memory) -> object:
        self.memory = memory
        return self

    def config_hdd(self, hdd) -> object:
        self.hdd = hdd
        return self

    def config_gpu(self, gpu) -> object:
        self.gpu = gpu
        return self

    def __str__(self) -> str:
        info = f'Serial Number: {self.serial_number}' \
               f'Memory: {self.memory} GB, ' \
               f'Hard Disk: {self.hdd} GB, ' \
               f'Graphics Card: {self.gpu}.'
        return info

    def create_single_computer(self, serial_number, memory, hdd, gpu) -> str:
        self.config_serial_number(serial_number)\
            .config_memory(memory)\
            .config_hdd(hdd)\
            .config_gpu(gpu)
        return self.__str__()

    def create_a_serial_computer(self, num_of_computer, memory, hdd, gpu):
        # TODO: provide a interface to create a list of computer by this function.
        pass


if __name__ == '__main__':
    cb = ComputerBuilder()
    res = cb.create_single_computer('A12345678', 8, 500, 'GeForce GTX 650 Ti')
    print(res)

