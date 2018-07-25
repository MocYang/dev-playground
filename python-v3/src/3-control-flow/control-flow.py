# -*- encoding: UTF-8 -*-

# 流程控制语句
# 1 if

# x = input('输入数字：')
# if int(x) > 10:
#     print(x + '大于10')
# elif int(x) < 10:
#     print(x + '小于10')
# else:
#     print(x + '等于10')

# 2 for
# words = ['a', 'b', 'c']
# people = [{'name': '1'}, {'name': '2'}]
# for w in words:
#     print(w)
#
# for p in people:
#     print(p['name'])
#
























# 4 break continue else 语句
# break 结束内层循环
# continue 结束本次循环，开始下一次循环
# else 当循环结束(for)或者条件为假时执行(while),
#       即循环体内，没有break语句结束本次循环，当循环结束时就会执行else语句

# for n in range(2, 10):
#     for x in range(2, n):
#         if n % x == 0:
#             print(n, 'equals ', x, ' * ', n // x)
#             break
#     else:
#         print(n, 'is a prime number')
#
# for n in range(2, 11):
#     if n % 2 == 0:
#         print(n, 'is even')
#         continue
#     print(n, 'is odd')

# 5 pass 语句
#   语义上的空语句，实际上不执行任何操作

# 无限循环的空循环，直到Ctrl-c退出
# while True:
#     pass

# 最小空类
# class MyEmptyClass:
#     pass

# 空函数
# def initlog(*args):
#     pass


# 6 函数定义
# 变量的作用域规则同js,优先查找当前作用域，再到父作用域，全局作用域,最后查找内置变量。
# 无return语句的函数，默认返回None
# def name(args):
#     """ 可选的函数说明 """
#     body
#
#


# def fib(n):
#     """
#         return fib list
#     """
#
#     ret = []
#     a, b = 0, 1
#     while a < n:
#         ret.append(a)
#         a, b = b, a + b
#     return ret
#
#
# print(list(fib(200)))


# 7 函数的参数
# 7.1 默认参数 def func(arg='default_value')
# def ask_ok(prompt, retries=4, reminder='please try again!'):
#     while True:
#         answer = input(prompt)
#         if answer in ('y', 'ye', 'yes'):
#             return True
#         elif answer in ('n', 'no', 'nop', 'nope'):
#             return False
#
#         retries -= 1
#         if retries <= 0:
#             raise ValueError('invalid use res')
#
#         print(reminder)
#
#
# ask_ok('input number')















