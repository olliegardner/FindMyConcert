from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.decorators import user_passes_test

#Add a custom decorator to require a venue user
def venue_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_venue,
        login_url=login_url,
        redirect_field_name=redirect_field_name
    )  #Create the decorator itself
    
    if function:
        return actual_decorator(function)
    return actual_decorator


#Add a custom decorator to require a giggoer user
def giggoer_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and not (u.is_venue),
        login_url=login_url,
        redirect_field_name=redirect_field_name
    ) #Create the decorator itself

    if function:
        return actual_decorator(function)
    return actual_decorator