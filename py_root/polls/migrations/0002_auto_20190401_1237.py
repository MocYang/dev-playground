# Generated by Django 2.1.7 on 2019-04-01 04:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quetion',
            old_name='qusetion_text',
            new_name='question_text',
        ),
    ]
