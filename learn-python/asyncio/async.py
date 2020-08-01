# /user/bin/env python
# -*- charset: utf-8 -*-
# @Author: yangqixin.
# @Time: 2020/7/28 08:39.
# @File: async.py
# @Software: PyCharm.

import asyncio
import threading


# @asyncio.coroutine
# def hello():
#     print('hello world %s' % threading.currentThread())
#     r = yield from asyncio.sleep(3)
#     print('hello again %s' % threading.currentThread())
#
#
# print('main thread running start.')
# loop = asyncio.get_event_loop()
# tasks = [hello(), hello()]
# loop.run_until_complete(asyncio.wait(tasks))
# loop.close()
# print('main thread end.')

@asyncio.coroutine
def wget(host):
    print('wget: {}...'.format(host))
    connect = asyncio.open_connection(host, 80)
    reader, writer = yield from connect
    header = 'GET / HTTP/1.0\r\nHost: {0}\r\n\r\n'.format(host)
    writer.write(header.encode('utf-8'))
    yield from writer.drain()

    while True:
        line = yield from reader.readline()
        if line == b'\r\n':
            break
        print('{0} header > {1}'.format(host, line.decode('utf-8').rstrip()))

    writer.close()


loop = asyncio.get_event_loop()
tasks = [wget(host) for host in ['www.sina.com', 'www.sohu.com', 'www.163.com']]
loop.run_until_complete(asyncio.wait(tasks))
loop.close()
