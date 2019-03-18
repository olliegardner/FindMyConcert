from concert.models import Concert


def recommendationEngine(request):
    user = request.user

    all_concerts = Concert.objects.all()
    concert_list = []

    i = 0
    concert_count = 0
    print(len(all_concerts))
    while i < 9 and concert_count < len(all_concerts):      
        if all_concerts[concert_count] not in user.giggoer.bookmarks.all():
            concert_list.append(all_concerts[concert_count])
            i += 1
        concert_count += 1
    return concert_list