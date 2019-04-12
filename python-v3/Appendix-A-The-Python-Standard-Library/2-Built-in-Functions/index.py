# -*- charset: utf-8 -*-
# built-in function sets.


# 1 abs(x)
#   x 可以是integer or floating point number, 如果x是复数，会返回其大小值？。如果x定义了__abs__(), 返回x.__abs__()。

# import fractions
# print(abs(fractions.Fraction(1, 3)))  # 1/3


# 2 all(iterable)
# 返回true，仅当所有元素都是真值
# 等价于
# def all(iterable):
#   for e in iterable:
#       if not e:
#           return False
#   return true


# 3 any(iterable)
# 返回true，如果有一个元素是真值，否则返回False
# 等价于：
# def any(iterable):
#   for e in iterable:
#       if e:
#           return True
#   return False

# 4 ascii(object)
# print(ascii({'a': '你好', '1': 22, 2: 2}))    # {'a': '\u4f60\u597d', '1': 22, 2: 2}


# 5 bin()
# print(bin(3))      # '0b11'
# print(bin(121))     # '0b1111001'
# print(bin(12.1))     # 'float' object cannot be interpreted as an integer
# print(format(3, '#b'), format(121, 'b'))   # 0b11 1111001

# 6 bool([x])  - class
# print(bool())       # False


# 7 breakpoint()


# 8 bytearray([source[, encoding[, errors]]]) - class
# print(bytearray('abc', 'utf-8'))    # bytearray(b'abc')
# print(bytearray(10))    # bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00')
# print(bytearray((111, 222, 33, 40, 255)))   # bytearray(b'o\xde!(\xff')

# 9 bytes([source[, encoding[, errors]]]) - class


# 10 callable(object)


# 11 chr(i) - 0 <= i < 0x10FFFF
# print(chr(90))  # 'Z'
# print(chr(9090))    # '⎂'
# print(chr(0))       # ''
# print(chr(0x10FFFF))    # ’􏿿‘
# print(chr(0x11FFFF))    # chr() arg not in range(0x110000)

# 12 @classmethod() - 装饰器


# 13 compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1)


# 14 complex([real[, imag]]) - class
# print(complex(1, 2))    # (1+2j)
# print(complex(0, 2))    # 2j
# print(complex(2))       # (2+0j)

# 15 delattr(object, attrname)
# same as del object.attrname


# 16 dict()  -  class
# dict(**kwargs)
# dict(mapping, **kwargs)
# dict(iterable, **kwargs)


# 17 dir()
# print(dir())    # ['__annotations__','__builtins__', '__cached__', '__doc__', '__file__', '__loader__',
#                    '__name__', '__package__', '__spec__']
# print(dir(dict))


# 18 divmod(a, b) same as：a // b, a % b
# print(divmod(3, 11), 3 // 11, 3 % 11)    # (0, 3), 0, 3
# print(divmod(11, 3), 11 // 3, 11 % 3)    # (3, 2) 3 2


# 19 enumerate(iterable, start=0)
# seasons = ['Spring', 'Summer', 'Fall', 'Winter']
# print(list(enumerate(seasons)))     # [(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
# print(list(enumerate(seasons, start=10)))   # [(10, 'Spring'), (11, 'Summer'), (12, 'Fall'), (13, 'Winter')]


# 20 eval(expression, globals=None, locals=None)


# 21 exec(object[, globals[, locals]])


# 22 filter(func, iterable)


# 23 float()


# 24 format()


# 25 frozenset()


# 26 getattr()


# 27 globals()


# 28 hasattr()


# 29 hash()


# 30 help()


# 31 hex()


# 32 id()


# 33 input()


# 34 int()


# 35 isinstance()


# 36 issubclass()


# 37 iter()


# 38 len()


# 39 list()


# 40 locals()


# 41 map()


# 42 max()


# 43 memoryview()


# 44 min()


# 45 next()


# 46 object()


# 47 oct()


# 48 open()


# 49 ord()


# 50 pow()


# 51 print()


# 52 property()


# 53 range()


# 54 repr()


# 55 reversed()


# 56 round()


# 57 set()


# 58 setattr()


# 59 slice()


# 60 sorted(0


# 61 staticmethod()


# 62 str()


# 63 sum()


# 64 super()


# 65 tuple()


# 66 type()


# 67 vars()


# 68 zip()


# 69 __import__()
