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


# 遍历字典
# dist.items()可以同时获得key和value
d3 = {'a': 1, 'b': 2, 'c': 3}
for k, v in d3.items():
    print(k, v)

# 遍历其他集合序列
# enumerate()方法，可以同时获得索引index和value
for i, v in enumerate([1, 2, 3]):
    print(i, v)


for i, v in enumerate((1, 2, 3)):
    print(i, v)


# zip() 方法，配对多个序列集合
q = ['name', 'age', 'address']
a = ['alice', 22, 'the street']
for q, a in zip(q, a):
    print('q is {0}? a: {1}'.format(q, a))

x
# reversed() 集合序列倒序
# sorted() 返回新的排序后的集合序列


