# /usr/bin/env python3
# -*- charset: utf-8 -*-

# @Author: yangqixin
# @TIME: 2021/6/25 16:21
# @FILE: upd_server.js
# @Email: 958292256@qq.com

import socket

HOST = '127.0.0.1'
PORT = 6666

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print('UDP bound on port: ', PORT)

    while True:
        data, addr = s.recvfrom(1024)
        print('Receive from %s:%s' % addr)
        if data == b'exit':
            s.sendto(b'Good bye!\n', addr)
            continue

        s.sendto(b'Hello\n %s.' % data, addr)
