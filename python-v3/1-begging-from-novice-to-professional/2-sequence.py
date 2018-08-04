# -*- charset: utf-8 -*-

# 序列
# 列表(list)和元组(tuple)
# list  可修改，元组  不可修改

# 1 索引 list[1], tuple[2]

# 2 切片 list[1:2] list[::3] list[::-1]

# 3 拼接 相同类型的序列可以拼接
# [1, 2, 3] + [4, 5] -> [1, 2, 3, 4, 5]

# 4 重复
# print('python' * 5)  # pythonpythonpythonpythonpython
# print([1, 2] * 2)   # [1, 2, 1, 2]
# print([None] * 5)     # [None, None, None, None, None]

# 打印一个如下输出。文字居中
# +------------------+
# |                  |
# |                  |
# |    asdfasdf      |
# |                  |
# |                  |
# +------------------+
#
# sentence = input('input a sentence: ')
#
# screen_width = 32
# text_width = len(sentence)
# box_width = text_width + 12
# text_row_remain = (box_width - text_width) // 2 - 1
# left_remain = (screen_width - text_width) // 2
#
# print()
# print(' ' * left_remain + '+' + '-' * (box_width - 2) + '+')
# print(' ' * left_remain + '|' + ' ' * (box_width - 2) + '|')
# print(' ' * left_remain + '|' + ' ' * (box_width - 2) + '|')
# print(' ' * left_remain + '|' + ' ' * text_row_remain + sentence + ' ' * text_row_remain + '|')
# print(' ' * left_remain + '|' + ' ' * (box_width - 2) + '|')
# print(' ' * left_remain + '|' + ' ' * (box_width - 2) + '|')
# print(' ' * left_remain + '+' + '-' * (box_width - 2) + '+')
# print()


# 5 in, not in检测给定元素是否在序列中

# database = [
#     ['albert', '1234'],
#     ['dilbert', '4242'],
#     ['smith', '7524'],
#     ['jones', '9843']
# ]
#
# username = input('username:  ')
# pin = input('pin: ')
# if [username, pin] in database:
#     print('access allowed!')
#


# len() - 返回序列的个数
# min() - 返回序列中的最小值
# max() - 返回序列中的最大值

##########################################
# list
# print(list('hello'))    # ['h', 'e', 'l', 'l', 'o']

# 1 给列表元素赋值
# l1 = [1, 2, 3]
# l1[2] = 44
# print(l1)   # [1, 2, 44]

# 2 删除一个列表元素 del语句
# l2 = [1, 2, 3]
# del l2[2]
# print(l2)   # [1, 2]

# 3 给切片赋值
# l3 = [1, 2, 3, 4]
# l3[1:3] = [1, 2, 3, 4]
# print(l3)   # [1, 1, 2, 3, 4, 4]
# l3[:] = []
# print(l3)  # [] ,等价与清空列表
#
# l4 = [1, 2]
# l4[2:2] = [3]
# print(l4)  # [1, 2, 3] ，插入新值


#######################################
# 列表方法
#
# 1 list.append()


