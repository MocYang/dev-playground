# -*- charset: utf-8 -*-
from django.db import models


class Blog(models.Model):
    name = models.CharField(max_length=20)
    tagline = models.TextField()

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name


class Entry(models.Model):
    authors = models.ManyToManyField(Author)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=20)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField()
    n_comments = models.IntegerField()
    n_pingbacks = models.IntegerField()
    rating = models.IntegerField()

    def __str__(self):
        return self.headline



