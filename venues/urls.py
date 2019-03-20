from django.conf.urls import url, include
from venues import views, forms
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.venueIndex, name='venue_index'),
    url(r'^addconcert/', views.addConcert, name='add-concert'),
    url(r'^delete/(?P<id>\d+)/$',views.deleteConcert, name='delete'),
    url(r'^edit/(?P<id>\d+)/$',views.editConcert, name='edit'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
