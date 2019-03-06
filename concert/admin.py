from django.contrib import admin
from concert.models import User, Concert, Comment

admin.site.register(User)
admin.site.register(Concert)
admin.site.register(Comment)
