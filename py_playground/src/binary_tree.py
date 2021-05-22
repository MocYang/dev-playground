# /usr/bin/env python3
# -*- charset: utf-8 -*-

# @Author: yangqixin
# @TIME: 2021/5/21 19:26
# @FILE: binary_tree.js
# @Email: 958292256@qq.com

# 分形树

import turtle

def binary_tree(t, branch_len):
    """
    画分形树
    :param t: turtle 对象
    :param branch_len: 树干长度
    :return:
    """
    if branch_len > 5:
        # 画树干
        t.forward(branch_len)

        # 画右子树
        t.right(20)
        binary_tree(t, branch_len - 15)

        # 画左子树
        t.left(40)
        binary_tree(t, branch_len - 15)

        # 回正, 退回原位置
        t.right(20)
        t.backward(branch_len)


def draw():
    t = turtle.Turtle()
    # 默认方向向右,这里左转 90 度,使画笔方向朝正北
    t.left(90)

    t.penup()
    t.backward(100)
    t.pendown()
    t.pencolor('#00ff00')
    t.pensize(2)
    binary_tree(t, 100)
    t.hideturtle()
    turtle.done()

draw()