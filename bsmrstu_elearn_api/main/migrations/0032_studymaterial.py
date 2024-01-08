# Generated by Django 4.1.5 on 2023-07-24 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0031_attempquiz_quiz'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudyMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('upload', models.FileField(null=True, upload_to='study_materials/')),
                ('remarks', models.TextField(null=True)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.course')),
            ],
            options={
                'verbose_name_plural': '15. Course Study Materials',
            },
        ),
    ]