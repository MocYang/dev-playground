# -*- charset: utf-8 -*-

# import builtins
# print(dir(builtins))


# global
# g = None
# print(g, g1)


# def func():
#     global g, g1
#     g, g1 = 1, 2
#
#
# func()
# print(g, g1)


# not work
# x, y = 1, 2
#
# def foo ():
#     nonlocal x, y
#     x, y = 2, 4
#     print(x, y)
#
#
# foo()

# 直接修改父级作用域中的变量是不允许的，只可以访问，修改和赋值需要使用nonlocal
# def teseter(start):
#     state = start
#     def nested(label):
#         # 访问可以
#         print(label, state)
#
#         # 修改会直接报错
#         # state += 1

# def outer():
#     l = [1, 2, 3]
#
#     def inner():
#         nonlocal l
#         l.append(1)
#         print(l)
#     return inner
#
#
# l1 = outer()
# l2 = outer()
#
# l1()    # [1, 2, 3, 1]
# l1()    # [1, 2, 3, 1, 1]
# l2()    # [1, 2, 3, 1]
# l2()    # [1, 2, 3, 1, 1]


# function attribute

# def outer(start):
#     def inner():
#         print(inner.state)
#         inner.state += 1
#
#     inner.state = start
#     return inner
#
#
# in1 = outer(1)
# in2 = outer(2)
# in1()
# in2()


# sate with mutable


# def outer(start):
#     def inner():
#         print(state[0])
#         state[0] += 1
#
#     state = [start]
#
#     return inner
#
#
# in1 = outer(1)
# in2 = outer(2)
# in1()
# in2()

































































































