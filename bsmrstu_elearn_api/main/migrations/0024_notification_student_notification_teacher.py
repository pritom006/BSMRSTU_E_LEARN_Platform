# Generated by Django 4.1.5 on 2023-07-15 22:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_alter_notification_notif_for_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.student'),
        ),
        migrations.AddField(
            model_name='notification',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.teacher'),
        ),
    ]