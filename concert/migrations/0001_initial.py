# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-15 16:34
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=30, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=70)),
                ('is_venue', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('rating', models.IntegerField(default=5, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('text', models.CharField(max_length=560, null=True)),
                ('commentID', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Comment Time')),
            ],
            options={
                'ordering': ['time'],
            },
        ),
        migrations.CreateModel(
            name='Concert',
            fields=[
                ('concertID', models.AutoField(primary_key=True, serialize=False)),
                ('artist', models.CharField(max_length=128)),
                ('date', models.DateField(verbose_name='Date')),
                ('start_time', models.TimeField(verbose_name='Start Time')),
                ('end_time', models.TimeField(verbose_name='End Time')),
                ('image', models.ImageField(null=True, upload_to='concert_images')),
                ('url', models.URLField()),
                ('description', models.CharField(max_length=560)),
                ('spotify_URI', models.CharField(max_length=100, null=True)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='GigGoer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('image', models.ImageField(blank=True, upload_to='profile_images')),
                ('bookmarks', models.ManyToManyField(related_name='bookmarks', to='concert.Concert')),
            ],
        ),
        migrations.CreateModel(
            name='Venue',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('venue_name', models.CharField(max_length=128)),
                ('location', models.CharField(max_length=128)),
                ('website', models.URLField()),
                ('description', models.CharField(max_length=560)),
                ('phone_number', models.CharField(max_length=15)),
                ('capacity', models.IntegerField(default=0)),
                ('image', models.ImageField(blank=True, null=True, upload_to='venue_images')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='concert',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='concert.Concert'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AddField(
            model_name='concert',
            name='venue',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='concert', to='concert.Venue'),
        ),
    ]
