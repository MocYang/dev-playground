# /user/bin/env python
# -*- charset: utf-8 -*-
# @Author: yangqixin.
# @Time: 2020-08-10 13:18.
# @File: fabfile.py
# @Software: PyCharm.

"""Fabric 任务配置
"""

from datetime import datetime

from fabric import Connection, task, Config

_TAR_FILE_ = 'dist-awesome-tar.gz'
_REMOTE_TMP_TAR = '/tmp/%s' % _TAR_FILE_
_REMOTE_BASE_DIR = '/srv/awesome'

# 服务器登陆用户名
USER = 'mocyang'
# 服务器地址
HOST = '192.168.3.25'

# 服务器数据库用户名和密码
DB_USER = 'root'
DB_PASSWORD = 'root'


def get_now():
    return datetime.now().strftime('%y-%m-%d_%H.%M.%S')


newdir = 'www-%s' % get_now()

@task
def do_build(ctx):
    includes = ['www/static', 'www/templates', 'favicon.ico', '*.py', 'requirements.txt', 'conf', 'DB']
    excludes = ['test', '.*', '*.pyc', '*.pyo', '__pycache__']

    with Connection('mocyang@192.168.3.25', connect_kwargs={'password': 'yy123456'}) as c:
        cmd = ['tar', '--dereference', '-czvf', 'dist/%s' % _TAR_FILE_]
        cmd.extend(['--exclude=\'%s\'' % ex for ex in excludes])
        cmd.extend(includes)

        c.local('echo "build file into: %s"' % _TAR_FILE_)
        c.local('rm -rf dist/*')
        c.local(' '.join(cmd))
        c.local('echo "build success！To deploy run: fab do_deploy."')



@task()
def do_deploy(c):
    config = Config({
        'connect_kwargs': {
            'password': 'yy123456'
        }
    })

    with Connection('mocyang@192.168.3.25', config=config) as c:
        c.run('rm -f %s' % _REMOTE_TMP_TAR)
        c.put('dist/%s' % _TAR_FILE_, _REMOTE_TMP_TAR)
        c.sudo('mkdir %s/%s' % (_REMOTE_BASE_DIR, newdir), password='yy123456')
        c.sudo('tar -xzvf %s -C %s' % (_REMOTE_TMP_TAR, _REMOTE_BASE_DIR + '/' + newdir), password='yy123456')
        c.sudo('rm -f %s' % (_REMOTE_BASE_DIR + '/www'), password='yy123456')
        # c.sudo('mkdir %s' % (_REMOTE_BASE_DIR + '/www'), password='yy123456')
        c.sudo('ln -s %s %s' % ((_REMOTE_BASE_DIR + '/' + newdir), (_REMOTE_BASE_DIR + '/www')), password='yy123456')
        # c.sudo('chown www-data:www-data www', password='yy123456')
        # c.sudo('chown -R www-data:www-data %s' % newdir, password='yy123456')
        c.sudo('supervisorctl stop awesome', password='yy123456')
        c.sudo('supervisorctl start awesome', password='yy123456')
        # 不应该每次deploy都重启nginx
        c.sudo('nginx -s reload', password='yy123456')
