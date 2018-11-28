# -*- charset: utf-8 -*-

# d1 = {'name': 1, 'age': 2}
# print(d1['name'])
# print(d1['age'])
# print(d1.keys())                # dict_keys(['name', 'age'])
# print(tuple(d1.keys()))         # ('name', 'age')
# print(list(d1.keys()))          # ['name', 'age']
# print(d1.items())
# print(tuple(d1.items()))        # (('name', 1), ('age', 2))
# print(list(d1.items()))         # [('name', 1), ('age', 2)]
#
# dt1 = tuple(d1.items())
# print(dt1[0][0], dt1[0][1])


# rec = {
#     'name': 'Bob',
#     'jobs': ['developer', 'manage'],
#     'web': 'www.example.com',
#     'home': {'state': 'Overworked'}
# }
# print(rec.get('home').get('state'))
# print(rec['home']['state'])

# l = [1, 2, 3]

# dict comprehensions
# print({key: key ** 2 for key in l})

# zip
key_list = ['a', 'b', 'c']
value_list = [1, 2, 3]
# print(dict(zip(key_list, value_list)))  # {'a': 1, 'b': 2, 'c': 3}
# print({k: v for (k, v) in zip(key_list, value_list)})  # {'a': 1, 'b': 2, 'c': 3}

