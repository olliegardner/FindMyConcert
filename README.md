# FindMyConcert


Welcome to FindMyConcert!
This is a univerisity project created by Ollie Gardner, Axel Stjerngren, Robert Pringle, Patryk Kaczmarczyk and Andrew Finlayson for the Web Application Development course 
at the University of Glasgow. The premise of the website is to allow users to find concerts in their 
local area and for venues to be able to easily add new concerts.

### Installation

First clone the repository and then navigate to the FindMyConcert source folder.

```
pip install -r requirements.txt

python manage.py makemigrations concert

python manage.py migrate
```

(Optional )Now you can run the population script. Please note that db.sqlite3 has to be deleted each time you run this script as the data base does not allow duplicate entries.
```python populate.py```

Now run the server!
```
python manage.py runserver
```

### External Sources
* django 1.11.17 | https://www.djangoproject.com | backend as specified by project specification
* django-crispy-forms | https://django-crispy-forms.readthedocs.io/en/latest/ | beautify forms in accordance to bootstrap
* django-bootstrap-datepicker-plus | https://pypi.org/project/django-bootstrap-datepicker-plus/ | date and time pickers for adding and editing concerts
* Bootstrap 4 | https://getbootstrap.com | CSS framework for all pages
* Toastr | https://codeseven.github.io/toastr/ | javascript framework for notification toasts
* IP-API | http://ip-api.com | geolocation API to retrieve your current location for events page
* Google Maps API | https://developers.google.com/maps/documentation/ | maps API to display location of venue on concert pages
* Spotify Webplayer | https://developer.spotify.com/documentation/widgets/ | emebedded Spotify player on concert pages
* SciPy | https://www.scipy.org | used for singular value decomposition of rating matrix to predict and recommend artists that users might like
* NumPy | http://www.numpy.org | used for matrix calculations
* bcrypt | https://pypi.org/project/bcrypt/ | password hashing algorithm for user authentication
* pillow | https://pypi.org/project/Pillow/ | python imaging library for storing images in django database
* pandas | http://pandas.pydata.org/pandas-docs/version/0.15/tutorials.html | dataframe manipulation in recommendation engine

TODO: explain that concert is related to event

Now if you navigate to http://127.0.0.1:8000/ you should be greeted by a view which looks like this:
![alt text](https://i.imgur.com/yPSk2fh.jpg)
