'''
Decorator design pattern
'''
from timeit import Timer


def fibonacci(n):
    assert(n >= 0), 'n must be >= 0'
    return n if n in (0, 1) else fibonacci(n-1) + fibonacci(n-2)


if __name__ == '__main__':
    t = Timer('fibonacci(8)', 'from __main__ import fibonacci')
    print(t.timeit())
    