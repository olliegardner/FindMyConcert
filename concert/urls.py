from django.conf.urls import url
from concert import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^about/$', views.about, name='about'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^my_events/$', views.my_events, name='my-events'),
    url(r'^contact/$', views.register, name='contact'),
]
