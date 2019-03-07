"""FindMyConcert URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin, auth
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from concert import views
from concert.views import GigGoerSignUp, VenueSignUp

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^concert/', include('concert.urls')),
    url(r'^venues/' , include('venues.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/$', views.index),  #Override accounts
    url(r'^accounts/logout/$', views.user_logout, name='logout'),
    url('accounts/', include('django.contrib.auth.urls')),
    url(r'^accounts/signup/$', views.chooseSignUp, name='signup-choose'),   #Override AllAuth form
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
