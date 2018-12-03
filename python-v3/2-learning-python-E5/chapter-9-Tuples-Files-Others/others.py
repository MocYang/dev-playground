# -*- charset: utf-8 -*-

# Comparisons, Equality, and Truth
# ==    tests value equivalence recursively.
# is    test object identity.

# L1 = [1, ('a', 3)]
# L2 = [1, ('a', 3)]
#
# print(L1 == L2, L1 is L2)   # True False
# L3 = L1
# print(L3 == L1, L3 == L2, L1 is L3)  # True True True

# for str, number
# S1 = 'spam'
# S2 = 'spam'

# short str were caches by python and reuse, so ==, is is the same
# print(S1 == S2, S1 is S2)  # True True

# for long str （test fail for now）
# S3 = 'i am long string aaaaaaasdfads asdfasdfasdfads'
# S4 = 'i am long string aaaaaaasdfads asdfasdfasdfads'
# print(S3 == S4, S3 is S4)

# True and False
# Numbers are False if zero, and True otherwise
# Other objects is False if empty, and True otherwise

# table 9-4
# Objects       Value
# 'spam'          True
# ''              False
# [1, 2]            True
# []                False
# {'a': 1}          True
# {}                False
# 0.0               False
# None              False


# type(X)
# return type of X







