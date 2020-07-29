#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/28 23:45.
# @File: test_sql.py

__author__ = 'yangqixin'

"""
测试数据库连接, 和基本操作
"""

# import logging
from my_orm import create_pool
from model import User, Blog, Comment


def test_user():
    yield from create_pool(user='www-data', password='www-data', database='awesome')

    u = User(
        name='test1',
        email='test1@example.com',
        passwd='123456',
        image='about: blank'
    )

    yield from u.save()


# for x in test_user():
#     logging.info(x)



