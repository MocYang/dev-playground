# -*- charset: utf-8 -*-

# in, not in 判断给定只是否在（不在）集合中
# is, is not 比较两个对象是否相等
# 比较运算符可以链式调用： a < b == c
# 布尔元素符：and, or, not

# 集合的比较
# 两个集合的类型必须相同
# 两个集合类型不同时，必须有对应的比较方法
# 逐字符比较，以字母的顺序

print([1, 2, 3] < [1, 2, 4])    # True
print((1, 2, 3) < (1, 2, 4))    # True
print('ABC' < 'C' < 'Pascal' < 'Python')    # True
print((1, 2, 3, 4) < (1, 2, 4))     # True
print((1, 2, 3) == (1.0, 2.0, 3.0))  # True

