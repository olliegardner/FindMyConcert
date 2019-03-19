from django import template
register = template.Library()

from concert.models import Concert, User

@register.simple_tag
def enough_ratings(concertID):
    #A tag which returns true if the concert has more than 0 ratings
    concert = Concert.objects.get(concertID = int(concertID))
    if len(concert.rating.all()) > 0:
        return True
    return False

@register.simple_tag
def get_rating(concertID):
    #This tag returns the average rating
    concert = Concert.objects.get(concertID = int(concertID))

    sum = 0
    for rating in concert.rating.all(): #Sum all the scores
        sum = sum + rating.score

    length = len(concert.rating.all()) #Error handling so that we can't get divide by 0 error
    if length == 0:
        length = 1

    return round(sum/length)

@register.simple_tag
def get_upcoming_concert_count(username):
    #This counts how many upcoming concerts a user has
    giggoer = User.objects.get(username=username).giggoer
    upcoming = 0

    for concert in giggoer.bookmarks.all():
        if concert.is_future():
            upcoming = upcoming + 1

    return upcoming

@register.simple_tag
def get_past_concert_count(username):
    #This counts how many past concerts a user has
    giggoer = User.objects.get(username=username).giggoer
    past = 0

    for concert in giggoer.bookmarks.all():
        if not concert.is_future():
            past = past + 1
    
    return past
