# -*- charset: utf-8 -*-

# 内置的系统库
import sys
import fibo
# 内置的方法和变量
import builtins
# dir()
# 返回一个模块中，定义的方法列表
# 不带参数调用，返回当前模块中定义的方法
print(dir(fibo))    # ['__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'fib']
