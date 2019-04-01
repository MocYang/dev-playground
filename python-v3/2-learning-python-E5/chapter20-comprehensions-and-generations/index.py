# -*- charset: utf-8 -*-

# Generator functions and expressions


def gensquares(n):
    for i in range(n):
        yield i ** 2


# for i in gensquares(5):
#     print(i, end=' : ')

# gen1 = gensquares(5)
# print(gen1)  # <generator object gensquares at 0x00000187C918AA98>
# print(gen1.__next__())
# print(gen1.__next__())
# print(gen1.__next__())
# print(gen1.__next__())
# print(gen1.__next__())
