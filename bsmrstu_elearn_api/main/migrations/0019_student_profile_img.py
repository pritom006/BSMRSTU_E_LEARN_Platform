# Generated by Django 4.1.5 on 2023-07-14 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_studentassignment_student_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='student_profile_imgs/'),
        ),
    ]
