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

# 3 range(start[, end[, step]])方法
#   遍历数字集合, end总是不在结果集中
# for i in range(5):
#     print(i)
# print(list(range(5, 10)))
# print(list(range(-10, -100, -20)))
# rangeArr = ['a', 'b', 'c']
# for i in range(len(rangeArr)):
#     print(i, rangeArr[i])

# 4 list()方法，生成一个可迭代对象
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

#     默认参数的赋值是在函数定义时，且只执行一次
# i = 5
#
#
# def f(a=i):
#     print(a)  # 5
#
#
# i = 6
# f()
#
#
# def f2(a, my_list=[]):
#     my_list .append(a)
#     return my_list
#
#
# print(f2(1))    # [1]
# print(f2(2))    # [1, 2]
# print(f2(3))    # [1, 2, 3]
#
#
# def f3(a, my_list=None):
#     print(my_list)  # 都是None
#     if my_list is None:
#         my_list = []
#     my_list.append(a)
#     return my_list
#
#
# print(f3(1))    # [1]
# print(f3(2))    # [2]
# print(f3(3))    # [3]


# 关键参数 fn(kargs=value)
# 调用函数时，指定参数的key和对应的value，此时，参数的顺序可以与函数定义时的参数顺序不同。
#   需要注意的点：
#       1 关键参数应该在必传参数之后
#       2 关键参数不应该和必传参数重复
#       3 关键参数key只能取函数定义时的形参名


# def key_func(a, b=1, c=2, d=3):
#     """
#     关键参数示例
#     :param a: 必传参数
#     :param b: 可选的默认参数
#     :param c: 可选的默认参数
#     :param d: 可选的默认参数
#     :return: None
#     """
#     print(a, b, c, d)
#
#
# key_func(1, c=5)    # 1 1 5 3
# key_func(a=4, b=5, c=6, d=1)   # 4 5 6 1
# key_func(b=4, a=5, d=6, c=1)   # 5 4 1 6
# key_func(a=4, b=5, c=6, d=1)   # 4 5 6 1


# 剩余参数*args，剩余关键参数**kargs
# 关键参数只允许在剩余参数之后，

# def shop_list(kind, *args, **kwargs):
#     print('kind:', kind)
#     for a in args:
#         print(a)
#
#     for kw in kwargs:
#         print(kw, ':', kwargs[kw])
#
#
# shop_list(
#     'a',
#     'b',
#     c=2,
#     d=3
# )

# def concat(*args, root='/'):
#     print(root.join(args))
#
#
# concat('public', 'static', 'css')   # public/static/css

# 解构 Unpacking Argument Lists
#   *list 列表
#   *tuple 元组
#   **dist 字典
#
# print(list(range(3, 6)))    # [3, 4, 5]
# args = [3, 6]
# print(list(range(*args)))   # 解构列表 [3, 4, 5]
#
#
# def print_list(**kwargs):
#     for kw in kwargs:
#         print(kw, ':', kwargs[kw])
#
#
# dist = {"a": 1, "b": 2}
# print_list(**dist)  # 解构一个字典


# Lambda 表达式
# small anonymous function 简单匿名函数
# 可以作为函数返回，或者函数传参

# def increment(n):
#     return lambda x: x + n


# add_10 = increment(10)
# print(add_10(1))     # 11
# print(add_10(10))    # 20
# print(add_10(5))     # 15
#
#
# def print_after_true(is_show, call=lambda x: x):
#     if is_show:
#         print(call())
#
#
# print_after_true(True)    # True
# print_after_true(1)       # 1


# 函数文档字符 documentation string
# 第一行文档应该简略说明该函数的意图，以大写字母开头结尾使用句号。
# 第二行应该是空行
# 余下的是参数和返回值，副作用的说明

# 函数注解 -- 参数类型，返回类型说明

def f(a: int, b: str='2') -> int:
    print('Annotations: ', f.__annotations__)   # {'a': <class 'int'>, 'b': <class 'str'>, 'return': <class 'int'>}
    print('Arguments: ', a, b)  # 2 2
    return a + 1


print(f(2))



















































