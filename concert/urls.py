from django.conf.urls import url, include
from concert import views, forms
from registration.backends.simple.views import RegistrationView

# redirects the user to the index page, if successful at login
class MyRegistrationView(RegistrationView):
    def get_success_url(self, user):
        return 'concert/accounts/register/complete/'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^about/$', views.about, name='about'),
    url(r'^myEvents/$', views.myEvents, name='myEvents'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^profile/(?P<username>[\w\-]+)/$', views.profile, name='profile'),
    url(r'^accounts/register/$', MyRegistrationView.as_view(), name='registration_register'),
    url(r'^accounts/', include('registration.backends.simple.urls')),
]
