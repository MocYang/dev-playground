# /user/bin/env python
# -*- charset: utf-8 -*-
# @Author: yangqixin.
# @Time: 2020/7/28 09:40.
# @File: aiohttp.py
# @Software: PyCharm.

import asyncio
from aiohttp import web


async def index(request):
    await asyncio.sleep(0.5)


