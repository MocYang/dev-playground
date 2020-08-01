#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/29 20:47.
# @File: handlers.py

__author__ = 'yangqixin'

'url handlers'
import re, time, json, logging, hashlib, base64, asyncio
from coroweb import get, post
from aiohttp import web

from model import User, Comment, Blog, next_id
from apis import APIValueError, APIResourceNotFoundedError, APIError
from conf.config import configs

COOKIE_NAME = 'awesome_session'
_COOKIE_KEY = configs.session.secret


def user2cookie(user, max_age):
    expires = str(int(time.time() + max_age))
    s = '{id}-{passwd}-{expires}-{key}'.format(id=user.id, passwd=user.passwd, expires=expires, key=_COOKIE_KEY)
    L = [user.id, expires, hashlib.sha1(s.encode('utf-8')).hexdigest()]
    return '-'.join(L)


async def cookie2user(cookie_str):
    if not cookie_str:
        return None

    try:
        L = cookie_str.split('-')

        if len(L) != 3:
            return None

        uid, expires, sha1 = L
        if int(expires) < time.time():
            return None

        user = await User.find(uid)
        if user is None:
            return None

        s = '{id}-{passwd}-{expires}-{key}'.format(id=user.id, passwd=user.passwd, expires=expires, key=_COOKIE_KEY)
        if sha1 != hashlib.sha1(s.encode('utf-8')).hexdigest():
            logging.info('invalid sha1...')
            return None

        user.passwd = '*******'
        return user

    except Exception as e:
        logging.exception(e)
        return None


@get('/')
async def index(request):
    summary = '这个家伙很懒, 什么都没有留下...'
    blogs = [
        Blog(id='1', name='Test Blog', summary=summary, created_at=time.time() - 120),
        Blog(id='2', name='Something New', summary=summary, created_at=time.time() - 3600),
        Blog(id='3', name='Learn Swift', summary=summary, created_at=time.time() - 7200)
    ]

    return {
        '__template__': 'blogs.html',
        'blogs': blogs,
        '__user__': request.__user__
    }


@get('/register')
def register():
    return {
        '__template__': 'register.html'
    }


@get('/signin')
def signin():
    return {
        '__template__': 'signin.html'
    }


@get('/logout')
def logout(request):
    referer = request.headers.get('Referer')
    r = web.HTTPFound(referer or '/')
    r.set_cookie(COOKIE_NAME, '-deleted-', max_age=0, httponly='http only')
    logging.info('user logout...')
    return r


@post('/api/authenticate')
async def authenticate(*, email, passwd):
    print('Into authenticate')
    if not email:
        raise APIValueError('email', 'Invalid email')

    if not passwd:
        raise APIValueError('passwd', 'Invalid password')

    users = await User.find_all('email=?', [email])
    if len(users) == 0:
        raise APIValueError('email', 'email not exist')

    user = users[0]

    # check passwd
    sha1 = hashlib.sha1()
    sha1.update(user.id.encode('utf-8'))
    sha1.update(b':')
    sha1.update(passwd.encode('utf-8'))

    if user.passwd != sha1.hexdigest():
        raise APIValueError('passwd', 'Invalid password')

    # authenticate ok, set cookie
    r = web.Response()
    r.set_cookie(COOKIE_NAME, user2cookie(user, 86400), max_age=86400, httponly='http only')
    user.passwd = '*' * 6
    r.content_type = 'application/json'
    r.body = json.dumps(user, ensure_ascii=False).encode('utf-8')
    return r


#
# @get('/api/users')
# async def api_get_users():
#     users = await User.find_all(order_by='created_at desc')
#     for u in users:
#         u.passwd = '******'
#
#     return dict(users=users)

_RE_EMAIL = re.compile(r'^[a-z0-9\.\-\_]+\@[a-z0-9\-\_]+(\.[a-z0-9\-\_]+){1,4}$')
_RE_SHA1 = re.compile(r'^[0-9a-f]{40}$')


@post('/api/users')
async def api_register_user(*, email, name, passwd):
    print('into api_register_user')
    if not name or not name.strip():
        raise APIValueError('name')

    if not email or not _RE_EMAIL.match(email):
        raise APIValueError('email')

    if not passwd or not _RE_SHA1.match(passwd):
        raise APIValueError('password')

    users = await User.find_all('email=?', [email])
    if len(users) > 0:
        raise APIError('register: failed', 'email', 'Email is already exist')

    uid = next_id()
    sha1_passwd = '{uid}:{passwd}'.format(uid=uid, passwd=passwd)
    user = User(
        id=uid,
        name=name.strip(),
        email=email,
        passwd=hashlib.sha1(sha1_passwd.encode('utf-8')).hexdigest(),
        image='about: blank'
    )
    await user.save()

    r = web.Response()
    r.set_cookie(COOKIE_NAME, user2cookie(user, 86400), max_age=86400, httponly='http only')
    user.passwd = '*' * 6
    r.content_type = 'application/json'
    r.body = json.dumps(user, ensure_ascii=False).encode('utf-8')
    return r
