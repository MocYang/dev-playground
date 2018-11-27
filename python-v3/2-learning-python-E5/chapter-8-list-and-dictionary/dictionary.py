# -*- charset: utf-8 -*-

d1 = {'name': 1, 'age': 2}
print(d1['name'])
print(d1['age'])
print(d1.keys())                # dict_keys(['name', 'age'])
print(tuple(d1.keys()))         # ('name', 'age')
print(list(d1.keys()))          # ['name', 'age']
print(d1.items())
print(tuple(d1.items()))        # (('name', 1), ('age', 2))
print(list(d1.items()))         # [('name', 1), ('age', 2)]

dt1 = tuple(d1.items())
print(dt1[0][0], dt1[0][1])


