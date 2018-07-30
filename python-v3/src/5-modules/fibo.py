# -*- charset: utf-8 -*-

# modules
# 模块内部，模块名全局可用module.__Name__
# Fibonacci numbers module


def fib (n):
    a, b = 0, 1
    ret = []
    while a < n:
        ret.append(a)
        a, b = b, a+b
    return ret



