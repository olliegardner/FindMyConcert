from django.conf.urls import url, include
from concert import views, forms

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^about/$', views.about, name='about'),
    url(r'^events/$', views.events, name='events'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),
    url(r'^bookmark/$',views.bookmark, name='bookmark'),
    url(r'^removebookmark/(?P<id>\d+)/$',views.removeBookmark, name='removebookmark'),
    url(r'^viewconcert/(?P<id>\d+)/$',views.viewConcert, name='view'),
]

