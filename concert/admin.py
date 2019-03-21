from django.contrib import admin
from concert.models import User, Concert, Comment, GigGoer, Venue, Rating, ProfileComment


#Register the different models on admin
admin.site.register(User)
admin.site.register(Concert)
admin.site.register(Comment)
admin.site.register(ProfileComment)
admin.site.register(GigGoer)
admin.site.register(Venue)
admin.site.register(Rating)
