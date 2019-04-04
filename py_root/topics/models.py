from django.db import models


# Create your models here.


class Person(models.Model):
    # SHIRT_SIZES = (
    #     ('S', 'Small'),
    #     ('M', 'Middle'),
    #     ('L', 'Large')
    # )
    #
    # first_name = models.CharField(max_length=20)
    # last_name = models.CharField(max_length=20)
    # shirt_size = models.CharField(max_length=1, choices=SHIRT_SIZES)

    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='MemberShip')

    def __str__(self):
        return self.name


class MemberShip(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    data_join = models.DateField()
    invite_reason = models.CharField(max_length=128)



