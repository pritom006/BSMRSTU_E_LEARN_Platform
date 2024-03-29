# Generated by Django 4.1.5 on 2023-07-13 23:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_alter_teacher_password'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='courserating',
            options={'verbose_name_plural': '8. Course Rating'},
        ),
        migrations.CreateModel(
            name='StudentFavoriteCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.student')),
            ],
            options={
                'verbose_name_plural': '7. Student Favorite Courses',
            },
        ),
    ]
