# -*- charset: utf-8 -*-

# 两种定义方法：def, lambda
# 变量的作用域: global, nonlocal
# 返回值: return yield


# def name (arg1, arg2, ... argN):
#   。。。
#   return value

# cond = False
#
# if cond:
#     def foo():
#         print('true def foo')
# else:
#     def foo():
#         print('false def foo')
#
# foo()
#
#
# def times(x, y):
#     print(x * y)
#
#
# times(2, 4)
# times(2, 'a')
# times('a', 2)
#
#
# def intersect(s1, s2):
#     res = []
#
#     for x in s1:
#         if x in s2:
#             res.append(x)
#
#     return res
#
#
# def intersect2(s1, s2):
#     return [x for x in s1 if x in s2]


# #####  scope check

scope = 'global scope'


def foo():
    scope = 'local scope'

    def inner():
        scope = 'inner scope'
        print(scope)

    inner()
    print(scope)


print(scope)
foo()
