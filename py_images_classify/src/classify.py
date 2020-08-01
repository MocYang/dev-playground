# /user/bin/env python
# -*- charset: utf-8 -*-
# @Author: yangqixin.
# @Time: 2020-07-20 19:01.
# @File: classify.py
# @Software: PyCharm.

# 载入原始图片文件(.raw, .jpg, .jpeg). 根据图片拍摄时间与芊虞生日的差值进行归类
#

from PIL import Image

class Classify:
    """

    """
    def __init__(self, root):
        """
        根据给定文件路径,初始化
        :param path_root:
        """
        self.root = root
        self.im = Image.open(self.root)

    def load(self):
        """
        递归加载所有的文件,目录
        :return:
        """



    def classify(self):
        """
        进行分类
        :return:
        """
        pass


image_loader = Classify('./images')

