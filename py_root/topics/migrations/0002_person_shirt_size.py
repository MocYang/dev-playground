# Generated by Django 2.1.7 on 2019-04-04 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='shirt_size',
            field=models.CharField(choices=[('S', 'Small'), ('M', 'Middle'), ('L', 'Large')], default='S', max_length=1),
            preserve_default=False,
        ),
    ]
