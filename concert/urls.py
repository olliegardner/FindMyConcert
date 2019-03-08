from django.conf.urls import url, include
from concert import views, forms

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^about/$', views.about, name='about'),
    url(r'^myEvents/$', views.myEvents, name='myEvents'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),
    url(r'^bookmark/(?P<id>\d+)/$',views.bookmark, name='bookmark'),
]

