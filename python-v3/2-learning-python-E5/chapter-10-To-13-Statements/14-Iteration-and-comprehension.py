# -*- charset: utf-8 -*-

# An iterator: any object with a __next__() method to advance to
# a next result, which raises StopIteration an the end.

# 1 The Iteration Protocol: File Iterator

script2_content = open('./script.py')
# print(script2_content.read())

for line in script2_content:
    print(line.upper(), end=' ')

script2_content.close()

# Manual iteration
l = [1, 2, 3, 4]
list_iterator = iter(l)
while True:
    try:
        item = list_iterator.__next__()
    except StopIteration:
        break
    print(item, end=' ')



