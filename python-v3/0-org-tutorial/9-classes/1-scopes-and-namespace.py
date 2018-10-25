# -*- charset: utf-8 -*-

def scope_test():
    def do_local():
        spam = 'local scope'

    def do_nonlocal():
        nonlocal spam
        spam = 'nonlocal spam'

    def do_global():
        global spam
        spam = 'global spam'

    spam = 'test spam'
    do_local()
    print('After do_local() call: ', spam)

    do_nonlocal()
    print('After do_nonlocal call: ', spam)

    do_global()
    print('After do_global call: ', spam)

scope_test()
print('In global scope: ', spam)



