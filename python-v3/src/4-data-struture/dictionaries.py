# -*- charset: utf-8 -*-

# 字典
# {key: value}
# key: 任何不可变的类型值都可以作为key.
#   如：number, sting,
#   tuple如果只包含string，number, tuple,也可以作为key
# list(dict) 返回只包含key的列表

tel = {'jack': 111, 'tom': 112}
print(tel['jack'])  # 111
print(list(tel))    # ['jack', 'tom']


# in 操作符，可以判断，给定key，是否在字典中
# not in 相反
print('jact' in tel)    # False

# 删除一对健值对
del tel['tom']
print(tel)  # {'jack': 111}

# dict()构造器
d2 = dict([('a', 1), ('b', 2), ('c', 3)])
print(d2)   # {'a': 1, 'b': 2, 'c': 3}

print(dict(a=1, b=2, c=3))  # {'a': 1, 'b': 2, 'c': 3}

print({x: x ** 2 for x in [1, 2, 3, 4]})    # {1: 1, 2: 4, 3: 9, 4: 16}


