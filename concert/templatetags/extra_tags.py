from django import template
register = template.Library()

from concert.models import Concert, User

@register.simple_tag
def enough_ratings(concertID):
    concert = Concert.objects.get(concertID = int(concertID))
    if len(concert.rating.all()) > 0:
        return True
    return False

@register.simple_tag
def get_rating(concertID):
    concert = Concert.objects.get(concertID = int(concertID))

    sum = 0
    for rating in concert.rating.all():
        sum = sum + rating.score

    length = len(concert.rating.all())
    if length == 0:
        length = 1

    return round(sum/length)

@register.simple_tag
def get_upcoming_concert_count(username):
    giggoer = User.objects.get(username=username).giggoer
    upcoming = 0

    for concert in giggoer.bookmarks.all():
        if concert.is_future():
            upcoming = upcoming + 1

    return upcoming

@register.simple_tag
def get_past_concert_count(username):
    giggoer = User.objects.get(username=username).giggoer
    past = 0

    for concert in giggoer.bookmarks.all():
        if not concert.is_future():
            past = past + 1
    
    return past
