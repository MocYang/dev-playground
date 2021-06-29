# /usr/bin/env python3
# -*- charset: utf-8 -*-

# @Author: yangqixin
# @TIME: 2021/6/25 17:23
# @FILE: udp_client.js
# @Email: 958292256@qq.com

import socket
HOST = '127.0.0.1'
PORT = 6666
addr = (HOST, PORT)
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    while True:

        data = input('Please input your name: ')
        if not data:
            continue
        s.sendto(data.encode(), addr)
        res, addrs = s.recvfrom(1024)
        if data == 'exit':
            print('Session is over from server: %s:%s' % addrs)
            break
