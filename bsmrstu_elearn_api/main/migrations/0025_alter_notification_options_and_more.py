# Generated by Django 4.1.5 on 2023-07-15 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0024_notification_student_notification_teacher'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'verbose_name_plural': '10.  Notification'},
        ),
        migrations.RemoveField(
            model_name='notification',
            name='notif_text',
        ),
        migrations.AddField(
            model_name='notification',
            name='notif_subject',
            field=models.CharField(max_length=200, null=True, verbose_name='Notification Subject'),
        ),
    ]