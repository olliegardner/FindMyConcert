from django.conf.urls import url, include
from venues import views, forms

urlpatterns = [
    url(r'^$', views.venueIndex, name='venue_index'),
    url(r'^addconcert/$', views.addConcert, name='add-concert'),
]
