# -*- charset: utf-8 -*-

# 类型
# Python 3.X
# 1 str Unicode字符串，包括ASCII
# 2 bytes 二进制字符，包括编码后的字符串
# 3 bytearray 字节数组，可变的二进制字符
# 4 file: text Unicode编码的字符串
# 5 file: bytes 原始的二进制文件

# Python 2.X
# 1 unicode 表示Unicode字符串
# 2 str 8位的字符传和二进制字符
# 3 bytearray 2.6引入，同3.X
# 4 file 文件内容是str
# 5 codecs 模块，可以处理Unicode文件

# basic
# common string literals and operations
# Operation                 interpretation(解释)
s1, s2 = '', ""                # 空字符串
s3 = "spam 's"                 # 引号表示，单/双
s4 = 's\np\tz\x00m'            # 转义字符
s5 = """...多行字符串..."""      # 多行字符
s6 = r'\temp\spam'             # 原始字符
s7 = b'sp\xc4m'                # 字节字符串

# print(s1, s2)
# print(s3)
# print(s4)
# print(s5)
# print(s6)
# print(s7)

# s1 + s1                      # 字符串的拼接
# s1 * 3                       # 字符串重复
# s[i]                         # 获取位置i处的字符
# s1[i:j]                      # 切片
# len(s2)                      # 字符长度
# "a %s parrot" % kind         # 字符串格式化表达式
# "a {0} parrot".format(kind)  # 2.6，2.7，3.X
# s.find('pa)                  # 搜索
# s.rstrip()                   # 一处右边的空格字符
# s.replace('pa', 'xx')         # 字符串替换
# s.split(',')                  # 字符串分割成列表
# s.isdigit()                   # 字符串是否之包含数字
# s.lower()                     # 转小写
# s.endswith('spam')            # 结尾测试
# 'spam'.join(strlist)          # 列表拼接成字符串
# s.encode('latin-1')           # 编码
# s.decode('utf-8')             # 解码
# for s in S: print(s)          # 迭代, 成员检查
# 'a' in 'abc'
# [x * 2 for x in S]
# map(ord, S) # ?
# ord('s')                      # 返回字符的ASCII码点值
# chr(115)                      # 返回ASCII码点值对应的字符
# re.match('sp(.*)am', line)    # 模式匹配
# u'eggs\u0020spam'             # Unicode字面量，2.X，3.3+


# 转义序列


# 原始字符串 r'strings'

# triple-quotes
# """
# any str
# """
# 也可以注释掉语句块
"""
import os
print(os.getcwd())
"""

# 字符串的格式化：
# 1 Formatting Expression basic
# 格式： '...%d...' % (values)
print('That is %d %s bird!' % (1, 'dead'))  # That is 1 dead bird!

# TODO：字符串格式化表达式-类型表7-4。P271
# code               Meaning
# s                     String
# r                     repr
# c                     (int or str)
# ...

# 完整的格式
# %[(keyname)][(flags)][(width)][.precision]typecode % (value)
# keyname   右侧的值，对应的键
# flags     左对齐（-），数字符号（+），正数之前的空格，负数（-），0填充等。
# width     字符串的宽度
# precision 小数位的精度


# 2 ''.format()







