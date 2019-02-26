from django.conf.urls import url
from concert import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^contacts/$', views.register, name='contacts')
]
