#!/user/bin/env python3
# -*- charset: utf-8 -*-

# @Time: 2020/7/28 10:03.
# @File: app.py

__author__ = 'yangqixin'

import asyncio, os, json, time
import logging
from datetime import datetime

import nest_asyncio
from aiohttp import web
from jinja2 import Environment, FileSystemLoader

import my_orm
from coroweb import add_routes, add_static

logging.basicConfig(level=logging.INFO)

nest_asyncio.apply()

app = web.Application()
routes = web.RouteTableDef()


@routes.get('/')
async def index(request):
    return web.Response(text='hello world')


def init_jinja2(app, **kwargs):
    logging.info('init jinja2...')
    options = {
        'autoescape': kwargs.get('autoescape', True),
        'block_start_string': kwargs.get('block_start_string', '{%'),
        'block_end_string': kwargs.get('block_end_string', '%}'),
        'variable_start_string': kwargs.get('variable_start_string', '{{'),
        'variable_end_string': kwargs.get('variable_end_string', '}}'),
        'auto_reload': kwargs.get('auto_reload', True)
    }


async def init(loop):
    app.add_routes(routes)
    # web.run_app(app)
    runner = web.AppRunner(app)
    await runner.setup()
    srv = await loop.create_server(runner.server, '127.0.0.1', 9000)
    logging.info('Server started at http://127.0.0.1:9000 ...')
    return srv


loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()
