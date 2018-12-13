# -*- charset: utf-8 -*-

# table 10-1 Python Statement
#   Statement                             Role                         Example
#   Assignment                       Creating reference             a, b = 1, 2
#   Calls and other expressions      Running functions              log.write('log ...')
#   print calls                      Printing objects               print('abc')
#   if/elif/else                     Selecting actions              if 'a' in 'abc':
#                                                                       print('a')
#   for/else                         Iteration                      for x in mylist:
#                                                                       print(x)
#   while/else                       General loops                  while True:
#                                                                       pass
#   pass                             Empty placeholder              class Text:
#                                                                       pass
#   break                           Loop exit                       while True:
#                                                                       if exittest(): break
#   continue                        Loop continue                   while True:
#                                                                       if skiptest(): continue
#   def                             Functions & methods             def func(a, b, c=1, *d):
#                                                                       print(a, b, c, d)
#   return                          Functions result                def add(a, b, c):
#                                                                       return a + b + c
#   yield                           Generator Functions             def gen(a):
#                                                                       for i in range(1, 5): yield i ** 2
#   global                          Namespace                       x = 'old'
#                                                                   def func():
#                                                                       global x, y; x = 'new'
#   nonlocal                        Namespaces(3.X)                 def outer():
#                                                                       x = 'outer'
#                                                                       def inner():
#                                                                           nonlocal x; x = 'inner'
#   import                          Module access                   import sys
#   from                            Attribute access                from sys import platform
#   class                           Building objects                class Test(Superclass):
#                                                                       staticData = []
#                                                                       def methods(self): pass
#   try/except/finally              Catching exceptions             try:
#                                                                       action()
#                                                                   except:
#                                                                       print('error')
#   Raise                           Trigger exceptions              raise EndSearch(location)
#   assert                          Debugging checks                assert x > y, 'x too small'
#   with/as                         Context managers(3.X, 2.6+)     with open('data') as myFile:
#                                                                       for line in myFile.readline():
#                                                                           print(line)
#   del                             Deleting references             del data['key']
#                                                                   del l[1:2]
#                                                                   del obj.attr
#                                                                   del variable

# About statement syntax
# 1 without semicolons, then end of a line terminates the statement on that line
# 2 nested statement are blocked and associated by their physical indentation











