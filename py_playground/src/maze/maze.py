# /usr/bin/env python3
# -*- charset: utf-8 -*-

# @Author: yangqixin
# @TIME: 2021/5/22 15:21
# @FILE: maze.js
# @Email: 958292256@qq.com

# 迷宫图数据,来源于 maze.txt 中的文本.
import turtle

t = turtle.Turtle()

OBSTACLE = '+'  # 墙壁
TRIED = '0x0002'  # 走过的点
DEAD_END = '0x0003'  # 死胡同
PART_OF_PATH = '0x0004'  # 正确的路径


class Maze:
    def __init__(self):
        self.maze_list = []
        self.rows_of_maze = 0
        self.cols_of_maze = 0
        self.start_x = 0
        self.start_y = 0
        self.point_width = 20
        self.point_height = 20
        self.wall_width = self.point_width / 4
        self.wall_height = self.point_height / 4
        self.maze_with = 0
        self.maze_height = 0

    def create(self, file_name):
        with open(file_name) as maze_source:
            for line in maze_source:
                row_list = []
                col = 0

                for ch in line[:-1]:
                    row_list.append(ch)

                    # 'S' 表示海龟的放置点
                    if ch == 'S':
                        self.start_x = self.rows_of_maze
                        self.start_y = col
                    col += 1

                self.rows_of_maze += 1
                self.maze_list.append(row_list)
                self.cols_of_maze = len(row_list)
            self.maze_with = len(self.maze_list[0]) * self.point_width
            self.maze_height = len(self.maze_list) * self.point_height

    def is_exit(self, x, y):
        """
        判断是否是出口点
        :param x:
        :param y:
        :return:
        """
        return x == 0 or y == 0 or x == self.cols_of_maze - 1 or y == self.rows_of_maze - 1

    def update_turtle(self, row_index, col_index, status):
        """
        更新海龟的位置, 并标注状态
        @param row_index 当前点在 maze_list 中对应的行 = 画布中的 y 坐标点
        @param col_index 当前点在 maze_list 中对应的列 = 画布中的 x 坐标点
        """
        turtle_color = {
            OBSTACLE: 'yellow',
            DEAD_END: 'red',
            PART_OF_PATH: 'green',
            TRIED: 'black'
        }

        points = self.get_coordinate(
            col_index * self.point_width,
            -row_index * self.point_height,
            self.maze_with / 2,
            self.maze_height / 2
        )
        center_pointer = (points[0][0] + self.point_width / 2, points[0][1] - self.point_height / 2)
        t.speed(10)
        t.penup()
        t.goto(center_pointer[0], center_pointer[1])
        t.fillcolor(turtle_color.get(status))
        t.begin_fill()
        t.circle(2)
        t.end_fill()

        if status:
            self.maze_list[row_index][col_index] = status

    def get_coordinate(self, x, y, offset_x, offset_y):
        """
        计算迷宫中各个点,对应于图中的方格的 4 个角坐标
        :param x:
        :param y:
        :param offset_x:
        :param offset_y
        :return:
        """
        point_with = self.point_width
        point_height = self.point_height

        return (
            (x - offset_x, y + offset_y),  # 左上角
            (x - offset_x + point_with, y + offset_y),  # 右上角
            (x - offset_x + point_with, y - point_height + offset_y),  # 右下角
            (x - offset_x, y - point_height + offset_y)  # 左下角
        )

    def move(self, x, y):
        # print('now on point: ', x, y, self.maze_list[x][y])

        # 1. 碰到墙壁, 失败
        if self.maze_list[x][y] == OBSTACLE:
            return False

        # 2. 走过的路径,或者死胡同,失败
        if self.maze_list[x][y] == TRIED or \
                self.maze_list[x][y] == DEAD_END:
            return False

        # 2.出口, 成功
        if self.is_exit(x, y) and x != self.start_x and y != self.start_y:
            print('I am out!')
            self.update_turtle(x, y, PART_OF_PATH)
            return True

        # 4. 标记当前点,已走过
        self.update_turtle(x, y, TRIED)

        found = self.move(x, y + 1) or \
                self.move(x + 1, y) or \
                self.move(x, y - 1) or \
                self.move(x - 1, y)

        if found:
            self.update_turtle(x, y, PART_OF_PATH)
        else:
            self.update_turtle(x, y, DEAD_END)

        return found

    # 画迷宫
    def draw(self):
        color_map = {
            '+': 'orange',  # 墙壁
            '-': 'white',  # 通道
            'S': 'green',  # 海龟
            '>': 'red'  # 已走过的点
        }

        maze_with = len(self.maze_list[0]) * self.point_width
        maze_height = len(self.maze_list) * self.point_height

        t.speed(10)
        t.penup()
        t.pencolor('black')
        t.pensize(4)
        # 画迷宫的边
        t.goto(-maze_with / 2, maze_height / 2)
        t.pendown()
        t.forward(maze_with)
        t.right(90)
        t.forward(maze_height)
        t.right(90)
        t.forward(maze_with)
        t.right(90)
        t.forward(maze_height)
        t.pensize(1)

        for (y, row) in enumerate(self.maze_list):
            for (x, ch) in enumerate(row):
                points = self.get_coordinate(
                    x * self.point_width,
                    -y * self.point_height,
                    maze_with / 2,
                    maze_height / 2
                )

                if ch == '-':
                    continue
                t.fillcolor(color_map[ch])
                t.pencolor(color_map[ch])
                t.penup()
                t.goto(points[0][0], points[0][1])
                t.pendown()
                t.begin_fill()
                t.goto(points[1][0], points[1][1])
                t.goto(points[2][0], points[2][1])
                t.goto(points[3][0], points[3][1])
                t.end_fill()

        self.move(self.start_x, self.start_y)

        turtle.hideturtle()
        turtle.done()


m = Maze()
m.create('./maze.txt')
m.draw()
# print(m.maze_list[14], len(m.maze_list[14]))
