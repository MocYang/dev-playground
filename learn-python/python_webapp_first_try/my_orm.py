#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/28 10:37.
# @File: my_orm.py

__author__ = 'yangqixin'

import logging, asyncio
import aiomysql

# __pool = None


def log(sql, args=()):
    logging.info('SQL: %s' % sql)


async def create_pool(loop, **kw):
    print('into create_pool')
    logging.info('create database connection pool...')
    global __pool
    __pool = await aiomysql.create_pool(
        host=kw.get('host', '127.0.0.1'),
        port=kw.get('port', 3306),
        user=kw['user'],
        password=kw['password'],
        db=kw['db'],
        charset=kw.get('charset', 'utf8'),
        autocommit=kw.get('autocommit', True),
        maxsize=kw.get('maxsize', 10),
        minsize=kw.get('minsize', 1),
        loop=loop
    )

    print('connection success: ', __pool)


async def select(sql, args, size=None):
    log(sql, args)
    print(sql, args)
    global __pool
    async with __pool.get() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute(sql.replace('?', '%s'), args or ())
            if size:
                rs = await cur.fetchmany(size)
            else:
                rs = await cur.fetchall()
            logging.info('rows returned: %s' % len(rs))
            return rs


async def execute(sql, args, autocommit=True):
    log(sql)
    async with __pool.get() as conn:
        if not autocommit:
            await conn.begin()

        try:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(sql.replace('?', '%s'), args)
                affected = cur.rowcount
                if not autocommit:
                    await cur.commit()
        except BaseException as e:
            if not autocommit:
                await conn.rollback()
                raise

        return affected


def create_args_string(num):
    L = []
    for n in range(num):
        L.append('?')

    return ', '.join(L)


class Filed(object):
    def __init__(self, name, column_type, primary_key, default):
        self.name = name
        self.column_type = column_type
        self.primary_key = primary_key
        self.default = default

    def __str__(self):
        return '<{}, {}: {}>'.format(self.__class__.__name__, self.column_type, self.name)


class StringFiled(Filed):
    def __init__(self, name=None, primary_key=False, default=None, ddl='varchar(100)'):
        super().__init__(name, ddl, primary_key, default)


class BooleanFile(Filed):
    def __init__(self, name=None, default=False):
        super().__init__(name, 'boolean', False, default)


class IntegerFiled(Filed):
    def __init__(self, name=None, primary_key=False, default=0):
        super().__init__(name, 'bigint', primary_key, default)


class FloatFiled(Filed):
    def __init__(self, name=None, primary_key=False, default=0.0):
        super().__init__(name, 'real', primary_key, default)


class TextFiled(Filed):
    def __init__(self, name=None, primary_key=False, default=None):
        super().__init__(name, 'text', primary_key, default)


class ModelMetaClass(type):
    def __new__(cls, name, bases, attrs):
        if name == 'Model':
            return type.__new__(cls, name, bases, attrs)

        table_name = attrs.get('__table__', None) or name
        logging.info('Found Model: {} (table: {})'.format(name, table_name))
        mappings = {}
        fields = []
        primary_key = None

        for k, v in attrs.items():
            if isinstance(v, Filed):
                logging.info(' Found mapping: {} ==> {}'.format(k, v))
                mappings[k] = v
                if v.primary_key:
                    if primary_key:
                        raise ValueError('Duplicate primary key for filed: {}'.format(k))
                    primary_key = k
                else:
                    fields.append(k)

        if not primary_key:
            raise ValueError('Primary key not found.')

        for k in mappings.keys():
            attrs.pop(k)

        escaped_fields = list(map(lambda f: str(f), fields))

        attrs['__mappings__'] = mappings
        attrs['__table__'] = table_name
        attrs['__primary_key__'] = primary_key
        attrs['__fields__'] = fields
        attrs['__select__'] = 'select `{0}`, {1} from `{2}`'.format(primary_key, ', '.join(escaped_fields), table_name)
        attrs['__insert__'] = 'insert into `{0}` ({1}, `{2}`) values ({3})'.format(
            table_name,
            ', '.join(escaped_fields),
            primary_key,
            create_args_string(len(escaped_fields) + 1)
        )
        attrs['__update__'] = 'update `{0}` set {1} where `{2}`=?'.format(
            table_name,
            ', '.join(map(lambda f: '`{}`=?'.format(mappings.get(f).name or f), fields)),
            primary_key
        )
        attrs['__delete__'] = 'delete from `{0}` where `{1}`=?'.format(table_name, primary_key)
        return type.__new__(cls, name, bases, attrs)


class Model(dict, metaclass=ModelMetaClass):
    def __init__(self, **kw):
        super(Model, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def get_value(self, key):
        return getattr(self, key, None)

    def get_value_or_default(self, key):
        value = getattr(self, key, None)
        if value is None:
            field = self.__mappings__[key]
            if field.default is not None:
                value = field.default() if callable(field.default) else field.default
                logging.debug('using default value for {}: {}'.format(key, str(value)))
                setattr(self, key, value)
        return value

    @classmethod
    async def find_all(cls, where=None, args=None, **kwargs):
        """
        find objects by where clause
        :param where:
        :param args:
        :param kwargs:
        :return:
        """
        sql = [cls.__select__]

        if where:
            sql.append('where')
            sql.append(where)

        if args is None:
            args = []

        order_by = kwargs.get('order by', None)
        if order_by:
            sql.append('order by')
            sql.append(order_by)

        limit = kwargs.get('limit', None)
        if limit is not None:
            sql.append('limit')
            if isinstance(limit, int):
                sql.append('?')
                args.append(limit)

            elif isinstance(limit, tuple) and len(limit) == 2:
                sql.append('?, ?')
                args.extend(limit)
            else:
                raise ValueError('Invalid limit value: {}'.format(str(limit)))
        rs = await select(' '.join(sql), args)

        return [cls(**r) for r in rs]

    @classmethod
    async def find(cls, primary_key):
        """
        find object by primary key
        :param primary_key:
        :return:
        """
        print(cls.__primary_key__)
        rs = await select('{} where `{}`=?'.format(cls.__select__, cls.__primary_key__), [primary_key], 1)
        if len(rs) == 0:
            return None

        return cls(**rs[0])

    async def save(self):
        args = list(map(self.get_value_or_default, self.__fields__))
        args.append(self.get_value_or_default(self.__primary_key__))
        rows = await execute(self.__insert__, args)

        if rows != 1:
            logging.warning('failed to insert record: affected rows: {}'.format(rows))

    async def update_it(self):
        args = list(map(self.get_value, self.__fields__))
        args.append(self.get_value(self.__primary_key__))
        rows = await execute(self.__update__, args)
        if rows != 1:
            logging.warning('failed to update by primary key: affected rows: {}'.format(rows))

    async def remove(self):
        args = [self.get_value(self.__primary_key__)]
        rows = await execute(self.__delete__, args)

        if rows != 1:
            logging.warning('failed to remove by primary key: affected rows: {}'.format(rows))
