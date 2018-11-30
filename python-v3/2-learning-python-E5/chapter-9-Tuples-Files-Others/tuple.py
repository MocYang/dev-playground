# -*- charset: utf-8 -*-

# empty_t = ()
# print(empty_t)  # ()
# print(type(empty_t))    # <class 'tuple'>


# namedtuple
from collections import namedtuple

Rec = namedtuple('Rec', ['name', 'age', 'jobs'])
b = Rec('Bob', age=40, jobs=['mrg', 'dev'])
print(b)            # Rec(name='Bob', age=40, jobs=['mrg', 'dev'])
print(b[0], b[1])        # Bob 40
print(b.name, b.age)    # Bob 40

# convert to dict
o_b = b._asdict()
print(o_b)  # OrderedDict([('name', 'Bob'), ('age', 40), ('jobs', ['mrg', 'dev'])])
print(o_b['name'], o_b['age'])  # Bob 40





