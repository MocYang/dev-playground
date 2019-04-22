# -*- charset: utf-8 -*-


class Person:
    def __init__(self, name):
        self.name = name


p1 = Person('p1')
p2 = Person('p2')
print(p1.name, p2.name)
