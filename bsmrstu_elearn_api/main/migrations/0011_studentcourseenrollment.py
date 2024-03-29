# Generated by Django 4.1.5 on 2023-07-11 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_rename_qualification_student_username_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentCourseEnrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled_courses', to='main.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrolled_student', to='main.student')),
            ],
            options={
                'verbose_name_plural': '6. Enrolled Courses',
            },
        ),
    ]
