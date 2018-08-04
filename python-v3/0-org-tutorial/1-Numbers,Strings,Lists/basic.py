# -*- coding: UTF-8 -*-

# 基本类型和运算符

# Number
# 类型：
#  int。 1, 2， 10 ...
#  float: 1.0, 2.02 ...
#  表达式中混合了int,和float类型的运算数，结果为float。
#  '/'      除 总是返回float类型
#  '//'     整除运算符，结果向下取整，返回int类型。
#  '%'      取余运算符
#  '**'     幂运算符
#  round(num, n) 函数，num 保留n个有效数字

# num1 = 17 / 3
# num2 = 17 // 3  # 5
# num3 = 17 % 3
# num4 = 5 ** 2
# print(num1)  # 5.666666666666667
# print(num2)  # 5
# print(num3)  # 2
# print(num4)  # 25
# print(round(1.002, 2))  # 1.0
# print(round(1.00, 0))   # 1.0
# print(round(1.01, 2))   # 1.01
# num5 = 3 + 5j
# print(num5)

# String
# 构造器 str(object=b'', encoding='utf-8', errors='strict')
# 返回object的字符串表示，如果object没有传入，返回空字符串.
# 规则如下：
#   1. 如果encoding,errors参数都不传，返回object.__str__()方法调用的结果,
#      如果object，没有__str__()方法，str(),返回repr(object)。
#   2. 如果encoding,errors，至少传了其一，object,应该是类字节对象(bytes,bytearray)，
#      str(bytes,encoding,errors)返回的结果等同于，bytes.decode(encoding, errors),
#
# 方法：str实现了所有通用序列操作方法

# 可以使用单引号或双引号 (', ")
# r'abd\n' 不对字符串进行转义, 直接输入为原字符串raw
# 字符串拼接 '+'. 如： 'na' + 'me' => 'name'
# 字符串重复 '*'. 如:  3 * 'na' => 'nanana'
# 多个字符串字面量如果以空格分隔，会自动拼成一个字符串
# 字符串可以使用下标来获取单个字符。如：str = 'hello' str[0]
# 索引可以是负数，此时字符串从右向左取值, 负数的索引从-1开始。
# 获取字符串的长度： str.__len__()
# 字符串截取：str[start:end], 符合包左不包右的原则.start 默认为0，end默认为字符串的长度。
# 于是有：str === str[:i] + str[i:]总是成立。
# 如果索引大于字符串的长度，会抛出IndexError: string index out of range. （获取单个字符时），
# python字符串是immutable的，因此，尝试重新赋值给字符串子串或字符会报错。
# 内置的len（）方法，返回字符串的长度。

# str1 = 'string1'
# str2 = "string2"
# str3 = 'I\' m great.'
# str4 = '"yes" he said.'
# str5 = r'hello \' you \n no.'
# 多行字符串
# str6 = '''
#   nothing special
#   yes.
# '''
# str7 = '''\
#     no more string.
#     en.
# '''
#
# str8 = 'na' + 'me'  # 'name'
# str9 = 3 * 'na'     # 'nanana'
# str10 = 'na' * 3    # 'nanana'
# print(str1)
# print(str2)
# print(str3)
# print(str4)
# print(str5)
# print(str6)
# print(str7)
# print(str8)
# print(str9)
# print(str10)
# str11 = 'hello ' ' world'
# print(str11)
# print(str11[2])
# print(str11[str11.__len__() - 1])
# print(str11[0:4])
# print(str11[:4])
# print(str11[5:])
# print(len(str10))
# print(len(str11))

# str12 = 'python'
# print(str12[-6])

# print(str(b'abc'))

# str方法如下;
# 1. str.capitalize() 返回新的字符串，首字母大写
print('capitalize'.capitalize())  # Capitalize

# 2. str.casefold() new in 3.3.
#   返回大小写转换后的字符串副本.类似于lowercase,只不过更严格的忽略所有的大小写区别。
print('ß'.casefold())  # ss

# 3. str.center(width[, fillchar])
#   返回给定长度width的子串, 原字符串居中，前后只使用fililchar填充，默认是ASCII空格。
#   如果width小于等于len(str),返回原字符串
print('abcdefg'.center(10))  # ' abcdefg  '

# 4. str.count(sub[, start[, end]])
#   返回sub子串在可选的范围内出现的次数(非重叠次数)
print('abababbaab'.count('ab'))  # 4

# 5. str.encode(encoding='uft-8', erros='strict') changed  v3.1
#   返回字符串编码后的bytes对象。
print('abc$ab&'.encode())   # b'abc$ab&'

# 6. str.endswith(suffix[, start[, end]])
#   在可选的给定范围内，str是否已suffix结尾。
print('abcdefg'.endswith('efh'))    # False
print('abcdefg'.endswith('efg'))    # True


# Lists 列表
# 列表的slice（list[start:end]）操作，总是返回新的列表，
# 列表的拼接操作 l1 + l2
# append()方法，在列表末尾加入一个元素，类似push方法
# 子列表元素可以重新赋值,这可以实现，插入，删除，清空列表等操作。
# len()方法，返回列表的元素个数

# l1 = [1, 2, 3, 4, 5]
# l2 = [6, 7, 8]
# print(l1)
# print(l1[0])
# print(l1[2:4])
# print(l1[:])
# print(l1 == l1[:])
# print(l1 + l2)
# l1.append(11)
# print(l1)

# l1[2:4] = [1, 2, 3, 4]  # [1, 2, 1, 2, 3, 4, 5]
# print(l1)
# l1[:] = []  # []
# print(len(l1))
# print(l1.__len__())
# print(str(l1))

# 斐波那契数列
# a, b = 0, 1
# while a < 10:
#     print(a, end=', ')
#     a, b = b, a + b
