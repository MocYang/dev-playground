# -*- charset: utf-8 -*-
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
# 3 剩余参数*args，剩余关键字参数**k_args
#         args是个元组，k_args是个字典

def print_info(name='temp', age=22):
    print('{}-{}'.format(name, age))


print_info('hello', 21)  # hello-21
print_info(age=22, name='world')  # world-22







