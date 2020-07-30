#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/30 23:19.
# @File: config.py

__author__ = 'yangqixin'

from conf.config_default import configs as dev_config
from conf.config_override import configs as prod_config


class Dict(dict):

    def __init__(self, names=(), values=(), **kwargs):
        super(Dict, self).__init__(**kwargs)

        for k, v in zip(names, values):
            self[k] = v

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dict' object has no attribute '{}'".format(key))

    def __setattr__(self, key, value):
        self[key] = value


def merge(source, override):
    res = {}
    for k, v in source.items():
        if k in override:
            if isinstance(v, dict):
                res[k] = merge(v, override[k])

            else:
                res[k] = override[k]
        else:
            res[k] = v

    return res


def to_Dict(d):
    D = Dict()
    for k, v in d.items():
        D[k] = to_Dict(v) if isinstance(v, dict) else v
    return D


configs = to_Dict(merge(dev_config, prod_config))

