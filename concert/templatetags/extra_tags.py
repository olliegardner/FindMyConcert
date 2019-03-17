from django import template
register = template.Library()

from concert.models import Concert

@register.simple_tag
def enough_ratings(concertID):
    print(concertID)
    concert = Concert.objects.get(concertID = int(concertID))

@register.simple_tag
def get_rating(concertID):
    print(concertID)
    concert = Concert.objects.get(concertID = int(concertID))

    sum = 0
    for rating in concert.rating.all():
        sum = sum + rating.rating

    length = len(concert.rating.all())
    if length == 0:
        length = 1

    return round(sum/length)