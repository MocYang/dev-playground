# -*- encoding: UTF-8 -*-

# 流程控制语句
# 1 if

# x = input('输入数字：')
# if int(x) > 10:
#     print(x + '大于10')
# elif int(x) < 10:
#     print(x + '小于10')
# else:
#     print(x + '等于10')

# 2 for
# words = ['a', 'b', 'c']
# people = [{'name': '1'}, {'name': '2'}]
# for w in words:
#     print(w)
#
# for p in people:
#     print(p['name'])

# 3 range(start[, end[, step]])方法
#   遍历数字集合, end总是不在结果集中
for i in range(5):
    print(i)
print(list(range(5, 10)))
print(list(range(-10, -100, -20)))
rangeArr = ['a', 'b', 'c']
for i in range(len(rangeArr)):
    print(i, rangeArr[i])

# 4 list()方法，生成一个可迭代对象