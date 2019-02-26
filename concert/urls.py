from django.conf.urls import url
from concert import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
]
