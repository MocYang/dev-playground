#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/30 23:15.
# @File: config_override.py

__author__ = 'yangqixin'

# 生产环境

configs = {
    'db': {
        'host': '127.0.0.1',
        'port': 3306,
        'user': 'root',
        'password': 'root',
        'database': 'awesome'
    },
    'session': {
        'secret': 'ALJLJ0asdf'
    }
}
