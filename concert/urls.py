from django.conf.urls import url, include
from concert import views, forms

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^upcomingEvents/$', views.upcomingEvents, name='upcomingEvents'),
    url(r'^pastEvents/$', views.pastEvents, name='pastEvents'),
    url(r'^about/$', views.about, name='about'),
    url(r'^myEvents/$', views.myEvents, name='myEvents'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),
]
