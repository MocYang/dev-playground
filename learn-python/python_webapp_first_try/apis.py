#!/user/bin/env python3
# -*- charset: utf-8 -*-
# @Time: 2020/7/29 20:48.
# @File: apis.py

__author__ = 'yangqixin'

"""
JSON API definition
"""

import json
import logging
import inspect
import functools


class APIError(Exception):
    """
    the base APIError
    """
    def __init__(self, error, data='', message=''):
        super(APIError, self).__init__(message)
        self.error = error
        self.data = data
        self.message = message


class APIValueError(APIError):

    def __init__(self, field, message=''):
        super(APIValueError, self).__init__('value: invalid', field, message)


class APIResourceNotFoundedError(APIError):

    def __init__(self, field, message=''):
        super(APIResourceNotFoundedError, self).__init__('value: not founded', field, message)


class APIPermissionError(APIError):

    def __init__(self, message):
        super(APIPermissionError, self).__init__('permission: forbidden', 'permission', message)







