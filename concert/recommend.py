from concert.models import Concert


def recommendationEngine():
	
	concert_list = Concert.objects.all()
	return concert_list