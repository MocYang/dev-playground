# -*- charset: utf-8 -*-

# 格式化输出
from math import pi
from string import Template


# 1 使用格式说明符
# fmt = 'hello, %s. %s age.'
# value = ('Yu', 24)
# print(fmt % value)   # hello, Yu. 24 age.

# 2 模板字符串
# tmpl = Template('hello $name, I`m $age old.')
# print(tmpl.substitute(name='Yu', age=24))  # hello Yu, I`m 24 old.

# 3 str.format()
# print('{}, {}, {}'.format(1, 2, 3))  # 1, 2, 3
# print('{0}, {1}, {2}'.format(1, 2, 3))  # 1, 2, 3
# print('{1}, {0}, {2}'.format(1, 2, 3))  # 2, 1, 3

# print('{name} is {value: .2f}'.format(name='PI', value=pi))
# PI is  3.14

# 3设置字符串的格式
# 3.1 替换字段名
# print('{}, {two}, {three}, {}'.format(1, 4, two=2, three=2))

# 3.2 转换标志 !s,!a,!r.
# print('{PI!s}, {PI!r}, {PI!a}'.format(PI='π'))   # π, 'π', '\u03c0'

# 3.3 格式说明符
# print('{n:f}'.format(n=100))  # 100.000000
# print('{n:%}'.format(n=20))   # 2000.000000%


# 3.3 宽度、精度、千位分隔符
# print('{n:10}'.format(n=3))        #          3
# print('{n:10}'.format(n='hello'))  # hello

# print('Pi is {pi:.3f}.'.format(pi=pi))  # Pi is 3.142.

# print('{n:,}'.format(n=100**3))  # 1,000,000

# 3.4 符号、对齐和用0填充
# print('{n:010.2f}'.format(n=pi))  # 0000003.14

# 左对齐<,右对齐>，居中对齐^
# print('{n:<10.2f}'.format(n=pi))  # 3.14
# print('{n:>10.2f}'.format(n=pi))  #       3.14
# print('{n:^10.2f}'.format(n=pi))  #    3.14

# 指定填充字符
# print('{n:&<12.3f}'.format(n=pi))  # 3.142&&&&&&&
# print('{n:&>12.3f}'.format(n=pi))  # &&&&&&&3.142
# print('{n:&^12.3f}'.format(n=pi))  # &&&3.142&&&&

# = 指定将填充字符放在符号和数字之间
# print('{n1:%=10.2f}'.format(n1=pi))  # %%%%%%3.14
# print('{n1:%=10.2f}'.format(n1=-pi))  # -%%%%%3.14

# 字符串方法

# 1 str.center(width[, char])
# center通过在字符两边添加填充字符，默认为空格，让字符串居中
# print('abc'.center(10, '-'))  # ---abc----

# 2 str.find(substr[, start[, end]])
# 查找子串，返回子串第一次出现的索引，没有匹配的子串，返回-1

# 3 str.join(list/tuple)
# 将序列值合并成字符串
# arr = ['1', '2', '3', '4']
# tpl = ('1', '2', '3', '4')
# print('+'.join(arr))  # 1+2+3+4
# print(', '.join(tpl))  # 1, 2, 3, 4

# 4 str.lower()

# 5 str.replace()
# print('this is $.'.replace('$', 'dog'))  # this is dog.

# 6 str.split()
# print('1,2,3,4'.split(','))  # ['1', '2', '3', '4']

# 7 str.strip()
# 方法strip将字符串开头和末尾的空白(但不包括中间的空白)删除，并返回删除后的结果
# print('  abc dcd  '.strip())  # abc dcd

# str.translate(table)
# table = str.maketrans('a', 'b')
table = str.maketrans('ABC', 'abc')
print('Hello Abc are Cat'.translate(table))  # Hello abc are cat
