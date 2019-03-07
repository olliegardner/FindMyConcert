from django.contrib import admin
from concert.models import User, Concert, Comment, GigGoer, Venue

admin.site.register(User)
admin.site.register(Concert)
admin.site.register(Comment)
admin.site.register(GigGoer)
admin.site.register(Venue)
