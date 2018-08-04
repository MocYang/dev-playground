# -*- charset: utf-8 -*-
# set
#   无序集合，元素唯一
# set的数学运算
# a - b a,b的差集
# a | b a,b的并集 元素在a|b|both
# a & b a,b的交集
# a ^ b 元素在a|b

s1 = {'a', 'b', 'c', 'd'}
s2 = set('1')

# 创建空set,只能使用set()方法
s_empty = set()
print(s_empty)

print('a' in s1)    # True

s3 = set('abasdfadfasdfa')
s4 = set('lijndeihadaeidkend')

print(s3)   # {'s', 'a', 'b', 'd', 'f'}
print(s4)   # {'a', 'k', 'l', 'i', 'd', 'n', 'e', 'j', 'h'}
print(s4 - s3)  # {'k', 'l', 'i', 'n', 'e', 'j', 'h'}


