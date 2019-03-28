# -*- charset: utf-8 -*-

import sys

print(sys.getrecursionlimit())  # default 1000

# function annotations(注解)
# def func(a: 'spam', b: (1, 10), c: float) -> float:
#     return a + b + c
#
#
# print(func(1, 2, 3))  # 6
# print(func.__annotations__)


# function annotations with defaults
# def func1(a: 'spam' = 1, b: (1, 10) = 1, c: float = 1.0):
#     return a + b + c
#
#
# print(func1(1, 2, 3))  # 6
# print(func1(1, 2, 2))  # 4.0

# anonymous functions: lambda.


