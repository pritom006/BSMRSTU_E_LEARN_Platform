# Generated by Django 4.1.5 on 2023-07-22 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_alter_notification_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('detail', models.TextField()),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher')),
            ],
            options={
                'verbose_name_plural': '11.  Quiz',
            },
        ),
        migrations.AlterField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='course_chapters', to='main.course'),
        ),
        migrations.AlterField(
            model_name='studentfavoritecourse',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.course'),
        ),
        migrations.CreateModel(
            name='QuizQuestions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questions', models.CharField(max_length=200)),
                ('ans1', models.CharField(max_length=200)),
                ('ans2', models.CharField(max_length=200)),
                ('ans3', models.CharField(max_length=200)),
                ('ans4', models.TextField()),
                ('right_ans', models.DateTimeField(auto_now_add=True)),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('quiz', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quiz')),
            ],
            options={
                'verbose_name_plural': '12.  Quiz Questions',
            },
        ),
        migrations.CreateModel(
            name='CourseQuiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('quiz', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quiz')),
            ],
            options={
                'verbose_name_plural': '13.  Course Quiz',
            },
        ),
    ]
