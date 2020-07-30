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

routes = web.RouteTableDef()


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

    path = kwargs.get('path', None)

    if path is None:
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www/templates')

    logging.info('set jinja2 template path: {}'.format(path))

    env = Environment(loader=FileSystemLoader(path), **options)
    
    filters = kwargs.get('filters', None)
    if filters is not None:
        for name, f in filters.items():
            env.filters[name] = f

    app['__templating__'] = env


async def logger_factory(app, handler):
    async def logger(request):
        logging.info('Request: {method} {path}'.format(method=request.method, path=request.path))
        return await handler(request)

    return logger


async def data_factory(app, handler):
    async def parse_data(request):
        if request.method == 'POST':
            request.__data__ = await request.join()
            logging.info('request json: {}'.format(request.__data__))

        elif request.content_type.startswith('application/x-www-form-urlencoded'):
            request.__data = await request.post()
            logging.info('request form: {}'.format(request.__data__))

        return await handler(request)

    return parse_data


async def response_factory(app, handler):
    async def response(request):
        logging.info('Response handler...')

        res = await handler(request)
        print(res)
        if isinstance(res, web.StreamResponse):
            return res

        if isinstance(res, str):
            if res.startswith('redirect'):
                return web.HTTPFound(res[9:])

            res_cont = web.Response(body=res.encode('utf-8'))
            res_cont.content_type = 'text/html;charset=utf-8'
            return res_cont

        if isinstance(res, dict):
            template = res.get('__template__', None)

            if template is None:
                resp = web.Response(
                    body=json.dumps(res,
                                    ensure_ascii=False,
                                    default=lambda o: o.__dict__
                                    ).encode('utf-8')
                )
            else:
                print(template)
                resp = web.Response(
                    body=app['__templating__'].get_template(template).render(**res).encode('utf-8')
                )
                resp.content_type = 'text/html;charset=utf-8'

            return resp

        if isinstance(res, int) and 100 <= res < 600:
            return web.Response(res)

        if isinstance(res, tuple) and len(res) == 2:
            t, m = res

            if isinstance(t, int) and 100 <= t < 600:
                return web.Response(t, str(m))

        # default
        resp = web.Response(body=str(res).encode('utf-8'))
        resp.content_type = 'text/plain;charset=utf-8'
        return resp

    return response


def datetime_filter(t):
    delta = int(time.time() - t)

    if delta < 60:
        return u'1 分钟前'

    if delta < 3600:
        return u'{}分钟前'.format(delta // 60)

    if delta < 86400:
        return u'{}小时前'.format(delta // 3600)

    if delta < 604800:
        return u'{}天前'.format(delta // 86400)

    dt = datetime.fromtimestamp(t)


async def init(loop):
    await my_orm.create_pool(user='root', password='yy123456', db='awesome', loop=loop)

    app = web.Application(loop=loop, middlewares=[
        logger_factory, response_factory
    ])

    init_jinja2(app, filters=dict(datetime=datetime_filter))

    add_routes(app, 'handlers')
    add_static(app)

    # web.run_app(app)
    runner = web.AppRunner(app)
    await runner.setup()
    srv = await loop.create_server(runner.server, '127.0.0.1', 9000)
    logging.info('Server started at http://127.0.0.1:9000 ...')
    return srv


loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()
