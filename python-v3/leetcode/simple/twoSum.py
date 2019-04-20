# -*- charset: utf-8 -*-
class Solution:
    def two_sum(self, nums, target):
        for (i, n) in enumerate(nums):
            # if n <= target:
            desc = target - n
            try:
                desc_index = nums.index(desc, i + 1)
                if desc_index != -1:
                    print(nums, target, [i, desc_index])
                    return [i, desc_index]
            except ValueError:
                continue


s = Solution()

test_cases = [
    {
        'nums': [2, 7, 11, 18],
        'target': 9
    },
    {
        'nums': [3, 2, 3],
        'target': 6
    },
    {
        'nums': [3, 2, 4],
        'target': 6
    },
    {
        'nums': [0, 4, 3, 0],
        'target': 0
    },
    {
        'nums': [-1, -2, -3, -4, -5],
        'target': -8
    }
]

# print(s.two_sum(test_cases[1]['nums'], test_cases[1]['target']))

for single_test in test_cases:
    s.two_sum(single_test['nums'], single_test['target'])
