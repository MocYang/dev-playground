# -*- charset: utf-8 -*-

# from random import choice
#
# x = choice(['12334', ['1', '2', '3', '4', '5']])
# print(x.count('3'))
#
#
# def print_len(p):
#     print('len of x:', repr(p), 'is', len(p))
#
#
# print_len('abc')

# 私有属性
# 约定类的私有属性以双下划线开头，
# 以双下划线开头的属性，被转换为_Class.attr的形式。
# 从类的外部访问私有属性可以：Class._Class__attr
# 如果你不希望名称被修改，又想发出不要从外部修改属性或方法的信号，可用一个下划线打 10 头。这虽然只是一种约定
# 例如：from module import * 不会导入以一个下划线开头的名称

from abc import ABC, abstractmethod


class Person:
    name = 'static'

    # def __init__(self):
    #     self.name = ''
    #     self.age = 0

    def set_name(self, name):
        self.name = name

    def get_name(self):
        return self.name

    def say_name(self):
        print('hello, i am {name}'.format(name=self.name))


p = Person()
p.set_name('abc')
p.say_name()

p2 = Person()
p2.say_name()
print(p2.name)


class SubPerson(Person):
    pass


sp = SubPerson()
print(issubclass(SubPerson, Person))
print(SubPerson.__bases__)  # (<class '__main__.Person'>,)
print(isinstance(sp, SubPerson))  # True
print(isinstance(sp, Person))  # True
print(sp.__class__)  # <class '__main__.SubPerson'>

sp_class = sp.__class__

sp2 = sp_class()
print(sp2)
print(isinstance(sp_class, SubPerson))  # False,有点奇怪

# 类的命名空间
# 每个类，都有自己的命名空间

# 确定一个类是否是另一个类的子类，issubclass(Class, SuperClass)
# 查看一个类的基类，Class.__bases__

# 确定对象是否是类的实例。isinstance
# 确定对象属于那个类，obj.__class__
# 检测对象是否包含属性, hasattr(obj, attr_name)
# getattr(obj, attr_name, default_attr) 访问一个属性，如果该属性不存在，赋予该属性提供的默认值
# setattr(obj, attr_name, attr_value)
# 查看对象存储的所有值，obj.__dict__


# 多重继承
# class sub_class(Super_class1, Super_class2, ...)

# 抽象基类
# 一般而言，抽象基类是不能（不应该）实例化的类
# 其职责是，指定子类应该实现的一组抽象方法

class AbstractPerson(ABC):
    @abstractmethod
    def say_name(self):
        pass


class AbsSub(AbstractPerson):
    name = 'abc'

    def say_name(self):
        print(self.name)


as1 = AbsSub()
print(isinstance(as1, AbstractPerson))  # True
print(isinstance(as1, AbsSub))  # True


class OtherClass:
    name = 'other'

    def say_name(self):
        print(self.name)


o1 = OtherClass()
print(isinstance(o1, OtherClass))

# 将OtherClass，注册为AbstractPerson，
# 此后，所有将OtherClass对象，都被视为AbstractPerson
AbstractPerson.register(OtherClass)
print(isinstance(o1, OtherClass))  # True
print(isinstance(o1, AbstractPerson))  # True

