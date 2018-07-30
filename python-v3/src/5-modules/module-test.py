# -*- charset: utf-8 -*-

# 模块引入的几种方法
import fibo
# from xxx import xxx
# from xxx import * 导入所有name，除了以_开头的。
# import xxx as xx

# 如果在命令行中运行一个python模块，
# 该模块的__name__ = '__main__'


print(fibo.fib(100))    # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]


