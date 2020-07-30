#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/29 20:47.
# @File: handlers.py

__author__ = 'yangqixin'

'url handlers'
import re, time, json, logging, hashlib, base64, asyncio
from coroweb import get, post
from model import User, Comment, Blog, next_id


@get('/')
async def index(request):
    users = await User.find_all()
    return {
        '__template__': '/index.html',
        'users': users
    }
