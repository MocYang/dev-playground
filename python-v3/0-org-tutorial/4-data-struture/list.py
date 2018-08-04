# -*- charset: utf-8 -*-

# 1 List
# 方法
# list.append(x)
#    列表末尾添加一个元素
l1 = [1, 2, 3]
l1.append(3)
print(list(l1))     # [1, 2, 3, 3]

# list.extend(iterable)
#   拓展原列表，将可迭代对象的所有元素添加的列表末尾，
#   该方法操作的是原列表本身，无返回值
#   等价于a[len(a):] = iterable
l2 = [1, 2, 3]
le = [4, 5]
# l2.extend(le)
print(l2)   # [1, 2, 3, 4, 5]

# l2[len(l2):] = le
# print(l2)   # [1, 2, 3, 4, 5]


# list.insert(i, x)
#    在位置i处，插入元素x
l3 = [1, 2, 3, 4]
l3.insert(0, -1)
print(l3)  # [-1, 1, 2, 3, 4]

# list.remove(x)
#    移除列表中给定的值x，如果x在列表中不存在，报错
#    操作成功，返回None
l4 = [1, 2, 3, 4]
l4.remove(3)
print(l4)   # [1, 2, 4]

# list.pop([i])
#   移除给定位置的元素并返回，如果没有指定索引i
#   则列表中最后一个元素被移除并返回
l5 = [1, 2, 3, 4, 5]
print(l5.pop(0))    # 1
print(l5.pop(2))    # 4
print(l5.pop())     # 5
print(l5)           # [2, 3]

# list.clear()
#   清空列表，等价于list[:]
l6 = [1, 2, 3, 4]
l6.clear()
print(l6)  # []

# list.index(x[, start, [ end]])
#   返回元素x第一次在列表中出现的索引，
#   如果没有找到，抛出ValueError
l7 = [1, 2, 3, 4]
print(l7.index(4))  # 3
print(l7.index(4, 2, 5))  # 3

# list.count(x)
# 返回x在列表中出现的次数
l8 = [2, 3, 4, 2, 1, 4, 5, 6, 7, 5, 4, 3, 2]
print(l8.count(1))   # 1
print(l8.count(2))   # 3
print(l8.count(10))  # 0


# list.sort(key=None, reverse=False)
#   对列表中的元素进行排序，无返回值
l9 = [2, 33, 4, 5, 21, 56, 3, 1, 3]
l9.sort()
print(l9)   # [1, 2, 3, 3, 4, 5, 21, 33, 56]

# list.reverse()
#   列表中，元素倒序, 无返回值
l10 = [2, 3, 4, 5, 6, 7]
l10.reverse()
print(l10)  # [7, 6, 5, 4, 3, 2]

# list.copy()
#   返回列表的一个副本（浅克隆）

# 将列表(list)作为栈(stack)
stack = [1, 2, 3]
# 入栈append(x)
# 出栈pop()
stack.append(4)
print(stack)
stack.pop()
print(stack)

# 列表(list)作为队列(queue)
# 入队列list.insert(0, x)
# 出队列list.pop()
# 列表作为队列时，入队列操作效率太低，因为要移动除队列头的所有元素
# 因此，可以使用collections.deque()
from collections import deque
queue = deque([1, 2, 3, 4])
print(queue)    # deque([1, 2, 3, 4])
queue.append(11)
print(queue)    # deque([1, 2, 3, 4, 11])
print(queue.popleft())  # 1
print(queue.popleft())  # 2

# 列表创建的其他简便方法

# 最普通的方法
# squares = []
# for x in range(10):
#     squares.append(x ** 2)
#
#
# print(squares)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 另一种：
# squares = list(map(lambda x: x**2, range(10)))
# print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
# 或者
# squares2 = [x ** 2 for x in range(10)]
# print(squares2)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

square3 = [(x, y) for x in [1, 2, 3] for y in [1, 2, 3] if x != y]
print(square3)  # [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

vec = [[1, 2], [3, 4], [4, 5], [6, 7]]
print([n for num in vec for n in num])  # [1, 2, 3, 4, 4, 5, 6, 7]

matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
matrix_reverse = [[row[i] for row in matrix] for i in range(4)]
print(matrix_reverse)    # [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]

# del 语句
#   1 删除给定索引的元素
#   2 删除子列表
#   3 删除整个列表
a = [1, 2, 3, 4, 5, 5, 6]

del a[1]
print(a)

del a[1:4]
print(a)

del a[:]
print(a)

# 删除了变量a的引用
del a



