#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/29 00:15.
# @File: run_test.py

__author__ = 'yangqixin'

import logging
import asyncio
import nest_asyncio

import my_orm
# from my_orm import create_pool
from model import User, Blog, Comment

# nest_asyncio.apply()
loop = asyncio.get_event_loop()


async def test_user(loop):
    # print('into test_user')
    await my_orm.create_pool(user='root', password='yy123456', db='awesome', loop=loop)
    # print('pool create success.... in test_user')
    # u = User(
    #     name='test1',
    #     email='test1@example.com',
    #     passwd='123456',
    #     image='about: blank'
    # )
    #
    # await u.save()
    u = await User.find('001595988198112711bc1ee9127494e92f88a408423b0ed000')
    print('find user: %s' % u)


async def test_blog(loop):
    # 如何根据用户名获取他发布的 blog ?
    print('into test_user')
    await my_orm.create_pool(user='root', password='yy123456', db='awesome', loop=loop)
    print('pool create success.... in test_user')
    u = User.find('id')
    print(u)

    # await b.save()


# print('before run test...')
loop.run_until_complete(test_user(loop))
