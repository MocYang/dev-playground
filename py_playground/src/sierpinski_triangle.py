# /usr/bin/env python3
# -*- charset: utf-8 -*-

# @Author: yangqixin
# @TIME: 2021/5/21 19:45
# @FILE: sierpinski_triangle.js
# @Email: 958292256@qq.com

# Sierpinski triangle(谢尔宾斯基三角形)

import turtle

t = turtle.Turtle()


def sierpinski(degree, points):
    """

    :param degree: 当前绘制的阶数
    :param points: 三角形的三个坐标点字典
    :return:
    """
    color_map = ['blue', 'red', 'green', 'yellow', 'white', 'black', 'orange', 'pink']
    draw(points, color_map[degree])

    if degree > 0:
        # 左三角
        sierpinski(degree - 1, {
            'left': points['left'],
            'top': get_mid(points['left'], points['top']),
            'right': get_mid(points['left'], points['right'])
        })

        # 上三角
        sierpinski(degree - 1, {
            'left': get_mid(points['left'], points['top']),
            'top': points['top'],
            'right': get_mid(points['top'], points['right'])
        })

        # 下三角
        sierpinski(degree - 1, {
            'left': get_mid(points['left'], points['right']),
            'top': get_mid(points['top'], points['right']),
            'right': points['right']
        })


def get_mid(p1, p2):
    return (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2


def draw(points, color):
    t.fillcolor(color)
    t.penup()
    t.goto(points['top'])
    t.pendown()
    t.begin_fill()
    t.goto(points['left'])
    t.goto(points['right'])
    t.goto(points['top'])
    t.end_fill()


points = {
    'left': (-200, -100),
    'top': (0, 200),
    'right': (200, -100)
}

sierpinski(3, points)

turtle.done()
