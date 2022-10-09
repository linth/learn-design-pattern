

# TODO: each function only do one thing.
# some functions are belong to provide the decision.
def fun1(*args):
    return args


# some functions are belong to provide the calculation.
def fun2(**kwargs):
    res = []
    if kwargs:
        pass
    else:
        pass
    return res


def fun3():
    res = []
    for i in range(0, 10):
        res.append(i)
    return res


# TODO: each process only do one process which consists of several functions.
# some processes are deal with the specific task.
def process1():
    res, p1 = [], []
    p = fun1(p1)
    fun2(name='george', age=20)
    res = p * 2
    return res


# some processes are deal with the specific task by several processes.
def process2():
    res, p1, d = [], [], dict()
    if fun1(p1):
        res = fun3() * 2
    else:
        print('error')
    return res


if __name__ == '__main__':
    p1 = process1()
    p2 = process2()
    print(p1)
    print(p2)
