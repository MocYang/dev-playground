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

num1 = 17 / 3
num2 = 17 // 3  # 5
num3 = 17 % 3
num4 = 5 ** 2
print(num1)  # 5.666666666666667
print(num2)  # 5
print(num3)  # 2
print(num4)  # 25
print(round(1.002, 2))  # 1.0
print(round(1.00, 0))   # 1.0
print(round(1.01, 2))   # 1.01
num5 = 3 + 5j
print(num5)

# String
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

str1 = 'string1'
str2 = "string2"
str3 = 'I\' m great.'
str4 = '"yes" he said.'
str5 = r'hello \' you \n no.'
# 多行字符串
str6 = '''
  nothing special
  yes.
'''
str7 = '''\
    no more string.
    en.    
'''

str8 = 'na' + 'me'  # 'name'
str9 = 3 * 'na'     # 'nanana'
str10 = 'na' * 3    # 'nanana'
str10 = 'na2222'
print(str1)
print(str2)
print(str3)
print(str4)
print(str5)
print(str6)
print(str7)
print(str8)
print(str9)
print(str10)
str11 = 'hello ' ' world'
print(str11)
print(str11[2])
print(str11[str11.__len__() - 1])
print(str11[0:4])
print(str11[:4])
print(str11[5:])
print(len(str10))
print(len(str11))



















































