# /user/bin/env python
# -*- charset: utf-8 -*-
# @Author: yangqixin.
# @Time: 2020/7/27 23:47.
# @File: coroutine.py
# @Software: PyCharm.

# 协程的简单示例
# 协程定义:
"""
简介
协程更适合于用来实现彼此熟悉的程序组件，如合作式多任务，迭代器，无限列表和管道。 协程最初在1963年被提出。
定义
协程不是进程或线程，其执行过程更类似于子例程，或者说不带返回值的函数调用。
一个程序可以包含多个协程，可以对比与一个进程包含多个线程，因而下面我们来比较协程和线程。我们知道多个线程相对独立，有自己的上下文，切换受系统控制；
而协程也相对独立，有自己的上下文，但是其切换由自己控制，由当前协程切换到其他协程由当前协程来控制。
"""


def consumer():
    print('[CONSUMER STARTED!!!]')
    r = ''
    while True:
        n = yield r
        if not n:
            return
        print('[CONSUMER] Consuming {0}'.format(n))
        r = '200 OK'


def product(c):
    print('Prepare product.')
    c.send(None)  # 启动生成器, 必须
    n = 0
    while n < 5:
        n += 1
        print('[PRODUCER] Producing {0}'.format(n))
        r = c.send(n)
        print('[PRODUCER] Consumer return: {0}.'.format(r))

    c.close()

c = consumer()
product(c)





