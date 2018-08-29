# -*- charset: utf-8 -*-

from copy import deepcopy
# 字典
# dict()
# 1 创建
#   1.1 字面量 {}
#   1.2 dict() 传入健值对序列或其他字典

# 2 方法
# 1 dict.clear()
#   清空字典中的所有健值对

# 2 dict.copy() 浅克隆
# 深克隆可使用模块copy.deepcopy
# d1 = {
#     'name': '12',
#     'store': {
#         'id': 1,
#         'title': 2
#     }
# }
# d2 = deepcopy(d1)
# print(d1)  # {'name': '12', 'store': {'id': 1, 'title': 2}}
# print(d2)  # {'name': '12', 'store': {'id': 1, 'title': 2}}
#
# d1['store']['id'] = 2
# print(d1)  # {'name': '12', 'store': {'id': 2, 'title': 2}}
# print(d2)  # {'name': '12', 'store': {'id': 1, 'title': 2}}

# 3 dict.fromkeys()
# 方法fromkeys创建一个新字典，其中包含指定的键，且每个键对应的值都是None。
# print({}.fromkeys(['name']))  # {'name': None}

# print(dict.fromkeys(['age', 'name'], False))  # {'age': False, 'name': False}

# 4 dict.get(key[, default])
# 返回key对应的value，如果key在字段中不存在，返回default，默认None

# 5 dict.items()
# 方法items返回一个包含所有字典项的列表，其中每个元素都为(key, value)的形式。字典项 在列表中的排列顺序不确定。

# 6 dict.keys()
# 方法keys返回一个字典视图，其中包含指定字典中的键。

d2 = {
    'name': 11,
    'name2': 11,
    'name3': 12
}
# print(d2.keys())  # dict_keys(['name', 'name2', 'name3'])

# 7 dict.pop(key)
# 方法pop可用于获取与指定键相关联的值，并将该键-值对从字典中删除。
# print(d2.pop('name'))  # 11
# print(d2)  # {'name2': 11, 'name3': 12}

# 8 dict.popitem()
# 随机弹出一个字典项

# 9 dict.setdefault(key[, value])
# 如果字典中没有相应的键，setdefault设置对应的健值对，如果键存在，则返回对应的值

# 10 d.update(x)
# 使用字典x中的项，来更新d
# x = {
#     'title': 'hello, 123'
# }
# d = {
#     'name': 'abc',
#     'title': 'abc'
# }
# d.update(x)
# print(d)  # {'name': 'abc', 'title': 'hello, 123'}

# 11 dict.value()
# 返回一个由字典中的值组成的字典视图
# d = {
#     '1': 1,
#     '2': 2,
#     '3': 3,
#     '4': 4
# }
# print(d.values())  # dict_values([1, 2, 3, 4])

