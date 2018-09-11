# -*- charset: utf-8 -*-
import math
# 函数
# 函数参数，传递的是值（引用）
# obj1 = {'name': 'alice'}


# def change_name(obj):
#     obj['name'] = None
#     return obj


# obj2 = change_name(obj1)
# print(obj1)  # {'name': None}
# print(obj2)  # {'name': None}

# example
# def store_name_init(obj):
#     obj['first'] = {}
#     obj['middle'] = {}
#     obj['last'] = {}
#
#
# def lookup(obj, label, name):
#     return obj[label].get(name).slice()
#
#
# def store(obj, fullname):
#     names = fullname.split()
#     if len(names) == 2: names.insert(1, '')
#     labels = ('first', 'middle', 'last')
#
#     for label, name in zip(labels, names):
#         people = lookup(obj, label, name)
#         if people:
#             people.append(fullname)
#         else:
#             obj[label][name] = [fullname]
#

# 函数的参数
# 1 普通的位置参数
# 2 关键参数和默认值
# 3 剩余参数*args，剩余关键字参数**kwargs
#         args是个元组，kwargs是个字典

# def print_info(name='temp', age=22):
#     print('{}-{}'.format(name, age))


# print_info('hello', 21)  # hello-21
# print_info(age=22, name='world')  # world-22

# 一些内置函数
# vars() - 返回当前命名空间
# globals() - 返回包含全局变量的字典
# locals() - 返回包含局部变量的字典
# 在函数内声明一个全局变量
#  def local:
#     global x

# 函数的嵌套
# 关键字nonlocal可以访问当前作用域之上（非全局作用域）的变量并赋值
# def outer():
#     out = 1
#
#     def inner(y):
#         nonlocal out
#         print(out)  # 1
#         out = out + 2
#         return out + y
#
#     return inner
#
#
# add_one = outer()
# print(add_one(2))


# 递归

def factorial(n, ret=1):
    if n == 1:
        return ret
    ret *= n
    n = n - 1
    return factorial(n, ret)


print(factorial(5))


def binary_search(arr, n):
    """
      二分查找 - 循环实现
    """

    start = 0
    end = len(arr) - 1

    def get_mid(s, e): return (s + e) // 2
    mid = get_mid(start, end)

    while start <= end:
        if n > arr[mid]:
            start = mid + 1
            mid = get_mid(start, end)
        elif n < arr[mid]:
            end = mid - 1
            mid = get_mid(start, end)
        else:
            return n, mid
    return None, n


a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
index, num = binary_search(a, 10)
print(index, num)


def binary_search_rec(arr, n, start, end):
    """
    二分查找，递归实现
    :param arr:
    :param n:
    :param start:
    :param end:
    :return:
    """
    mid = (start + end) // 2

    if start <= end:
        if arr[mid] < n:
            return binary_search_rec(arr, n, mid + 1, end)
        elif arr[mid] > n:
            return binary_search_rec(arr, n, start, mid - 1)
        else:
            return n, mid
    return n, None


print(binary_search_rec(a, 10, 0, len(a) - 1))


