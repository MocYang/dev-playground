# -*- charset: utf-8 -*-

import datetime
import math


def get_date():
    return datetime.date.today()


# def is_prime_number(number):
#     """
#     判断一个数，是否是质数，只判断到sqrt(n)
#     :param number:
#     :return:
#     """
#     if number == 1:
#         return True
#
#     for i in range(2, int(math.sqrt(number)) + 1):
#         if number % i == 0:
#             return False
#     return True


def is_prime_number(number):
    if number == 2 or number == 3:
        return True

    if number % 6 != 1 and number % 6 != 5:
        return False

    for i in range(5, int(math.sqrt(number) + 1), 6):
        if number % i == 0 or number % (i + 2) == 0:
            return False

    return True


def get_prime_number_list(upper_limit=0):
    """
    返回再给定上限的范围内的所有质数集合
    :param upper_limit:
    :return:
    """
    res = []
    for number in range(1, upper_limit + 1):
        if is_prime_number(number):
            res.append(number)

    res.reverse()
    return res


def get_factor(number):
    res = []
    for i in range(1, number // 2):
        if number % i == 0:
            res.append(i)

    res.append(number)
    return res


# ##################
#  以下计算可能的排列
# ###################
accumulate = 707829217


# print(get_prime_number_list(accumulate))
# print(get_prime_number_list(1000000))
# print(get_prime_number_list(11))
# print(get_factor(707829217))


def get_possible_arrange(seq):
    res = []
    seq.reverse()

    for (i, gr_num) in enumerate(seq):
        for (j, le_num) in enumerate(seq):
            if i < j:
                res.append(''.join([str(gr_num), str(le_num)]))

    return res


def get_odd_number_list_with_3(upper_limit):
    res = []
    total_count = 0
    chunk_size = 50000000

    def print_count():
        nonlocal res
        nonlocal total_count
        ret = res[:]
        res = []
        sub_seq_count = ''.join(ret).count('3')
        total_count += sub_seq_count
        print(total_count)

    odd_list = range(1, upper_limit + 1, 2)

    last_item = upper_limit - 1 if upper_limit % 2 == 0 else upper_limit
    print(last_item)

    list_with_3 = (str(x) for x in odd_list if str(x).find('3') != -1)

    for i in list_with_3:
        res.append(i)

        if len(res) > chunk_size:
            print_count()
            yield
        elif int(i) > upper_limit - chunk_size and int(i) >= last_item:
            print_count()
            print('end i: ', i)
            yield


# print(list(get_odd_number_list_with_3(866278171)))
# print('filter end.')

# 866278171 is result.
# 3 - count: 441684627

