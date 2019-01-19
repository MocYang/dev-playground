# -*- charset: utf-8 -*-
# 1 while

# while test:           # loop test
#       statements      # body
# else:                 # optional else
#       statements      # Run if did't exit loop with break

# y = 185
# x = y // 2
# while x > 1:
#     if y % x == 0:
#         print(y, 'has factor ', x)
#         break
#     x -= 1
#     print(x)
#
# else:
#     print(y, 'is prime')


# for item in sequence:
#      do something
# else:
#       runs without break.

#
# L = [1, 2, 3, 4, 5]
# for i in range(len(L)):
#     print(L[i:] + L[:i])


# methods
# 1 list(), range(), len()

# 2 zip(), map()
# keys = ['a', 'b', 'c']
# values = [1, 2, 3]
# print(list(zip(keys, values)))  # [('a', 1), ('b', 2), ('c', 3)]
# print({k: v for (k, v) in zip(keys, values)})  # {'a': 1, 'b': 2, 'c': 3}
# print(dict(zip(keys, values)))  # {'a': 1, 'b': 2, 'c': 3}
# print(list(map(ord, 'abcd')))  # [97, 98, 99, 100]

# Generating Both Offsets and Items: enumerate

# S = 'abcdef'
# for (offset, char) in enumerate(S):
#     print(offset, '---', char)



