# -*- charset: utf-8 -*-

import sys
import timer
reps = 10000
repslist = list(range(reps))


def for_loop():
    res = []
    for x in repslist:
        res.append(abs(x))
    return res


def list_comp():
    return [abs(x) for x in repslist]


def map_call():
    return list(map(abs, repslist))


def gen_expr():
    return list(abs(x) for x in repslist)


def gen_func():
    def gen():
        for x in repslist:
            yield abs(x)
    return list(gen())


print(sys.version)

for test_func in (for_loop, list_comp, map_call, gen_expr, gen_func):
    bestof = timer.bestoftotal(5, 1000, test_func)

    print('%-9s: %.5f' % (test_func.__name__, bestof))
