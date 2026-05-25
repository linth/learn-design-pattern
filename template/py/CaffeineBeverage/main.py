'''樣板方法模式執行範例'''
import sys


class Process:
    '''飲料製作流程選擇器'''

    @staticmethod
    def selected_condition():
        choice = input('請選擇飲料：1. 咖啡  2. 茶  ')
        if choice == '1':
            from Coffee import Coffee
            coffee = Coffee()
            coffee.prepare_recipe()
        elif choice == '2':
            from Tea import Tea
            tea = Tea()
            tea.prepare_recipe()
        else:
            print('無效選擇')
            sys.exit()


if __name__ == '__main__':
    process = Process()
    process.selected_condition()
