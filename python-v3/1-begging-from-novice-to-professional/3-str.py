# -*- charset: utf-8 -*-

# 格式化输出
from math import pi
from string import Template


# 1 使用格式说明符
fmt = 'hello, %s. %s age.'
value = ('Yu', 24)
print(fmt % value)   # hello, Yu. 24 age.

# 2 模板字符串
# tmpl = Template('hello $name, I`m $age old.')
# print(tmpl.substitute(name='Yu', age=24))  # hello Yu, I`m 24 old.

# 3 str.format()
# print('{}, {}, {}'.format(1, 2, 3))  # 1, 2, 3
# print('{0}, {1}, {2}'.format(1, 2, 3))  # 1, 2, 3
# print('{1}, {0}, {2}'.format(1, 2, 3))  # 2, 1, 3

# print('{name} is {value: .2f}'.format(name='PI', value=pi))
# PI is  3.14




