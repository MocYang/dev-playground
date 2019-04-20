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


# 23 float([x])


# 24 format(value[, format_spec])


# 25 frozenset(iterable)


# 26 getattr(object, name[, default])


# 27 globals()


# 28 hasattr(object, name)


# 29 hash(object)
# print(hash(1), hash(1.0))   # 1, 1
# print(hash(dict([('a', 1), ('b', 2)]))) # TypeError: unhashable type: 'dict'


# 30 help([object])


# 31 hex(x)


# 32 id(object)


# 33 input(prompt)


# 34 int([x[, base=10]])


# 35 isinstance(object, classinfo)
# def func(): pass
#
#
# print(type(func))   # <class 'function'>
# print(isinstance(func, function)) # ??


# 36 issubclass(class, classinfo)


# 37 iter(object[, sentinel])


# 38 len(s)


# 39 list([iterable])


# 40 locals()
# print(locals() == globals())    # True

# 41 map(func, iterable, ...)


# 42 max(iterable, *[, key, default]) ??
# 42 max(arg1, arg2, *args[, key])
# list_id = [
#     {
#         'id': 1
#     },
#     {
#         'id': 2
#     },
#     {
#         'id': 3
#     }
# ]
#
# print(max(list_id, key=lambda x: x['id']))


# 43 memoryview(obj)
# print(memoryview(bytes([12, 31])))  # <memory at 0x0000015027BFDE88>
# print(bytes([12, 31]))  # b'\x0c\x1f'

# 44 min(iterable, *[, key, default])
# 44 min(arg1, agr2, *args[, key, default])


# 45 next(iterator[, default])
# gen_list = (x for x in range(1, 3))
# print(next(gen_list, 100))  # 1
# print(next(gen_list, 100))  # 2
# print(next(gen_list, 100))  # 100
# print(next(gen_list, 100))  # 100


# 46 object() - class


# 47 oct(int)


# 48 open(file, mode='r', buffering=-1, encoding=None， errors=None, newline=None, closefd=True, opener=None)
# mode: r, w, b


# 49 ord(c)


# 50 pow(x, y[, z]) == (x ** y % z)


# 51 print(*object, sep='', end='\n', file=sys.stdout, flush=False)


# 52 property(fget, fset, fdel, doc=None)


# 53 range(stop)
# 53 range(start, stop[, step])


# 54 repr(object)


# 55 reversed(deq)


# 56 round(number[, ndigit])
# print(round(12.22323, 2))   # 12.22
# print(round(12.22523, 2))   # 12.23
# print(round(12123.22523, -1))   # 12120.0


# 57 set(object) - class
# print(set((1, 2, 3)))   # {1, 2, 3}


# 58 setattr(object, name, value)


# 59 slice(stop)
# 59 slice(start, stop[, step])


# 60 sorted(iterate, *, key=None, reverse=False)
# print(list(sorted([2, 1, 3])))


# 61 @staticmethod()


# 62 str(object='')
# 62 str(object=b'', encoding='utf-8', errors='strict')


# 63 sum(iterable[, start])


# 64 super([type[, object-or-type]])


# 65 tuple([iterable])


# 66 type(object)
# 66 type(name, bases, dict)


# 67 vars([object])


# 68 zip(*iterable)


# 69 __import__()
