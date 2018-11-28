# -*- charset: utf-8 -*-

# empty_t = ()
# print(empty_t)  # ()
# print(type(empty_t))    # <class 'tuple'>


# namedtuple
from collections import namedtuple
Rec = namedtuple('Rec', ['name', 'age', 'jobs'])
p1 = Rec('Bob', age=12, jobs=['dev', 'mgr'])











