# -*- charset: utf-8 -*-
"""
 timing tool
"""

import time
import sys

timer = time.clock if sys.platform[:3] == 'win' else time.time


def total(reps, func, *args, **kwargs):
    """

    :param reps:
    :param func:
    :param args:
    :param kwargs:
    :return:
    """
    repslist = list(range(reps))
    start = timer()
    for i in repslist:
        func(*args, **kwargs)

    elapsed = timer() - start

    return elapsed


def bestof(reps, func, *args, **kwargs):
    """

    :param reps:
    :param func:
    :param args:
    :param kwargs:
    :return:
    """
    best = 2 ** 32
    for i in range(reps):
        start = timer()
        func(*args, **kwargs)
        elapsed = timer() - start
        if elapsed < best:
            best = elapsed

    return best


def bestoftotal(reps1, reps2, func, *args, **kwargs):
    """
    best of reps1 runs of (total of reps2 runs of func)
    :param reps1:
    :param reps2:
    :param func:
    :param args:
    :param kwargs:
    :return:
    """
    return bestof(reps1, total, reps2, func, *args, **kwargs)

