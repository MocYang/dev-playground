# -*- charset: utf-8 -*-

# file
# table 9-2

# Operations                                Interpretation
# output = open(r'C:\spam', 'w')                create output file(w -> write)
# input = open('c:\spam', 'r')                  create input file (r-> read), default.
# aString = open('c:\spam')                     Read entire file into a single string
# sString = input.read(n)                       Read up to next N characters(or bytes)into a string
# aString = input.readline()                    Read next line (including \n newline)into a string
# aString = input.readlines()                   Read entire file into list of line strings(with \n)
# output.write(aString)                         Write a string of characters(or bytes) into file
# output.writelines(aList)                      Write all line strings in a list in a file
# output.close()                                Manual close(done for you when file is collected)
# output.flush()                                Flush output buffer to disk without closing
# anyFile.seek(N)                               Change file position to offset N for next operation
# for line in open('C:\data.txt'): use line     File iterators read line by line
# open('f.txt', encoding='latin-1')             Python 3.X Unicode text files(str strings)
# open('f.bin', 'rb')                           Python 3.X bytes files(bytes strings)
# codecs.open('f.txt', encoding='utf-8')        Python 2.X Unicode text files(unicode strings)
# open('f.bin', 'rb')                           Python 2.X bytes files(str strings)

# opening files
# afile = open(filename, mode[, buffer])
# file.method()
# filename              relative or absolute path
# buffer                buffer size, 0 mean output is unbuffered
# mode
#   r ---- read(text input, default)
#   w ---- write(crate and open for text output)
#   a ---- append text to the end
#   b ---- binary data
#   + ---- both input and output

# Files in Action
# myFile = open('myFile.txt', 'w')
# myFile.write('hello word\n')
# myFile.write('goodbye text file\n')
# myFile.close()

# myFile = open('./myFile.txt')
# print(myFile.readline())  # hello word
# print(myFile.readline())  # goodbye text file
# print(myFile.readline())  # '\n'
# myFile.close()

# Storing Python Objects in files: convert
# X, Y, Z = 12, 13, 14
# S = 'String'
# D = {'a': 1, 'B': None}
# L = ['1', 2, '3']

# F = open('myFile.txt', 'w')
# F.write(S + '\n')
# F.write('{},{},{}'.format(X, Y, Z) + '\n')
# F.write(str(L) + '\n')
# F.write(str(D) + '\n')
# F.close()

# F = open('myFile.txt')
# s_line = F.readline()
# print(s_line.rstrip())  # String

# int_line = F.readline()
# print([int(n) for n in (int_line.rstrip().split(','))])  # [12, 13, 14]

# list_line = F.readline()
# print(eval(list_line))  # ['1', 2, '3']

# dict_line = F.readline()
# print(eval(dict_line))  # {'a': 1, 'B': None}

# import pickle

# Storing Native Python Objects: pickle
# D = {'a': 1, 'b': 2}
# F = open('newFile.pkl', 'wb')
# pickle.dump(D, F)
# F.close()

# F2 = open('newFile.pkl', 'rb')
# D2 = pickle.load(F2)
# print(D2)   # {'a': 1, 'b': 2}
# F2.close()

# Storing Python Objects in JSON Format
# import json
# name = dict(first='yang', last='qianyu')
# print(name)  # {'first': 'yang', 'last': 'qianyu'}
# name_json = json.dumps(name)
# print(name_json)    # {"first": "yang", "last": "qianyu"}
# print(repr(name_json))  # '{"first": "yang", "last": "qianyu"}'
#
# load_name = json.loads(name_json)
# print(load_name)  # {'first': 'yang', 'last': 'qianyu'}
#
# json.dump(name, fp=open('test.json', 'w'), indent=2)

# Storing Packed Binary Data: struct
# import struct


# File Context Managers
# with open('xxx.xx') as myfile:
#       use files...

# try / finally













