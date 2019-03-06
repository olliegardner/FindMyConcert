from django.conf.urls import url, include
from venues import views, forms

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
