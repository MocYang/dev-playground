from django.db import models

# Create your models here.


class Users(models.Model):
    name = models.CharField(max_length=40)
    password = models.CharField(max_length=200)
    created_at = models.DateTimeField('time created')
    updated_at = models.DateTimeField('time updated')

    def __str__(self):
        return self.name

