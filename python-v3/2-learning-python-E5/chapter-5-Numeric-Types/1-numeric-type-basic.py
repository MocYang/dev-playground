# -*- charset: utf-8 -*-

# inventory(详细目录) of Python`s numeric toolbox
# 1 Integer(整数),Floating-point(浮点数) object.
# 2 Complex number object(复数).
# 3 Decimal(小数): fixed-precision object(精度固定).
# 4 Fraction(分数): rational number object(有理数).
# 5 Sets: 数值操作的集合.
# 6 布尔值：True, False.
# 7 内置函数，模块：round, math, random, etc.
# 8 第三方库：vector(向量),visualization(可视化),plotting(绘图),etc.

# TODO：python 操作符和优先级，P189


# set
# 集合：无序，唯一，只包含不可变对象(hashable)的集合
# 集合的运算，只能在同一类型之间（set），集合的方法参数可以接收任何iterable对象
# 两个集合相等：当且仅当，两个集合所含的元素完全相同
# set和frozenset实例的比较基于成员的比较，两种类型的混合操作（-,&,|,^,etc）返回的集合的类型取决于第一个操作数的类型

# s1 = set('abcd')
# print(s1)   # {'a', 'c', 'b', 'd'}
# s2 = set((1, 2, 3, 4))
# print(s2)   # {1, 2, 3, 4}
# s3 = {1, 2, 3, 4}
# print(type(s3))     # <class 'set'>
# print(s3)           # {1, 2, 3, 4}

# 集合运算
# s1 - s2 差集
# s1 | s2 并集
# s1 & s2 交集
# s1 ^ s2 对称差(s1 - s2) | (s2 - s1)
# s1 > s2 s1是否是s2的超集
# s1 < s2 s1是否是s2的子集

# 空集合,创建空set,只能使用set()方法
# s_empty = set()
# print(s_empty)  # set()

# sx = set('abcdedf')
# sy = set('acfgh')
# print(sx - sy)      # {'d', 'e', 'b'
# print(sy - sx)      # {'g', 'h'}
# print(sx | sy)      # {'d', 'h', 'c', 'g', 'f', 'b', 'e', 'a'}
# print(sx & sy)      # {'f', 'a', 'c'}
# print(sx ^ sy)      # {'h', 'b', 'd', 'e', 'g'}
# print(sx > sy, sx < sy)  # False False

# 成员检查 in
# print('a' in sx)    # True
# print('h' in sy)    # True
# print('2' in sy)    # False

s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = {4, 5, 6}
s4 = {1, 2}
s5 = {5, 6}
# methods
# 1 len(s)
print('==========')
print(len(s1))  # 3

# 2 s.isdisjoint(other) ,返回True,如果s和other互斥（当且仅当交集为空）
print('==========')
print(s1.isdisjoint(s2))    # False
print(s1.isdisjoint(s3))    # True


# 3 s.issubset(other) s, 是否是other的子集
# s <= other 子集
# s < other 真子集
print('==========')
print(s3.issubset(s1))
print(s4.issubset(s1))
print(s1 <= s1, s1 < s1)    # True False

# 4 s.issuperset(other) s, 是否是other的超集
# s >= other
# s > other
print('========')
print(s1.issuperset(s4))    # True
print(s1.issuperset(s5))    # False
print(s1.issuperset(s1))    # True
print(s1 >= s1, s1 > s1, s1 > s4)   # True False True

# 5 s.union(*others) 返回新的集合，元素为s和所有other的并集
print('==========')
print(s1.union(s2, s5))     # {1, 2, 3, 4, 5, 6}
print(s1)                   # {1, 2, 3}

# 6 s.intersection(*others) 返回新的集合，元素为s和所有other的交集
print('==========')
print(s1.intersection(s2))  # {2, 3}

# 7 s.difference(*others) 返回新的集合，元素为s和other的差集
print('==========')
print(s1.difference(s2, s3))    # {1}

# 8 s.symmetric_difference(*others) 返回新的集合，元素为s和other的对称差
print('==========')
print(s1.symmetric_difference(s2))  # {1, 4}

# 9 s.copy() 返回s的副本（浅克隆）
print('==========')
s1_copy = s1.copy()
print(s1_copy)          # {1, 2, 3}
print(s1 == s1_copy)    # True















# TODO：剩余方法待补充

# set comprehensions
# print('===================')
# print({x ** 2 for x in (1, 2, 3, 4)})   # {16, 1, 4, 9}

# 去重
L = [1, 2, 3, 1, 2, 3, 3, 4, 5, 6]
print(list(set(L)))  # [1, 2, 3, 4, 5, 6]


# Boolean
# True -- 1
# False -- 0
print(type(True))  # <class 'bool'>
print(isinstance(True, bool))   # True
print(isinstance(False, int))   # True
print(True == 1)    # True
print(True is 1)    # False
print(True or False)    # True
print(True + 2)     # 3

