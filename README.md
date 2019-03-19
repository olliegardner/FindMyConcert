# FindMyConcert


Welcome to FindMyConcert!
This is a univerisity project created by Ollie Gardner, Axel Stjerngren, Robert Pringle, Patryk Kaczmarczyk and Andrew Finlayson for the Web Application Development course 
at the University of Glasgow. The premise of the website is to allow users to find concerts in their 
local area and for venues to be able to easily add new concerts.

## Installation

First clone the repository and then navigate to the FindMyConcert source folder.

```
pip install -r requirements.txt

python manage.py makemigrations concert

python manage.py migrate
```

(Optional) Now you can run the population script. Please note that db.sqlite3 has to be deleted each time you run this script as the database does not allow duplicate entries.
```
python populate.py
```

Now run the server!
```
python manage.py runserver
```

Now if you navigate to http://127.0.0.1:8000/ you should be greeted by a view which looks like this:
![Screenshot of index page](https://i.imgur.com/yPSk2fh.jpg)

## Feautures
* Ability to register as 2 user types - GigGoers and Venues
* User authentication system with secure password hashing
* Email verficiation
* Password reset via email link
* Spotify integration
* Google Maps integration
* Responsive UI (mobile mode)
* Cross browser support
* Comments, ratings and tiles are added dynamically using AJAX without the need of reloading the page

#### Events
* Search available concerts (also by location using ip-api)
* Filter avaiable concerts
* Clear search
* See available concerts in tile form
* Hover over tile and watch it flip over to reveal concert details/view button/bookmark button (if logged in as GigGoer)
* Switch between all/upcoming/past concerts (if logged in)
* Edit/delete buttons
![Screenshot of events page](https://i.imgur.com/SyoNk9J.jpg)

#### Discover
* To access this page you must be logged in as a GigGoer
* See artist and concerts recommendations based on your previous ratings
* Add/remove bookmark and view concert
* TODO: explain how discover works
![Screenshot of discover page](https://i.imgur.com/sOpUc1F.jpg)

#### About
* See information about the creators
![Screenshot of about page](https://i.imgur.com/JP376un.jpg)

#### Contact
* Contact form to send a message to us
![Screenshot of contact page](https://i.imgur.com/kyaqzpS.png)

#### FAQ
* See a list of frequently asked questions with answers
![Screenshot of FAQ page](https://i.imgur.com/F5RcObm.png)

#### Profile
* Ability to view your profile and other user's profiles
* See events which the user has bookmarked
* See events that venues are hosting
* Edit your own profile (if logged in)
![Screenshot of contact page](https://i.imgur.com/BoMnGlD.png)

#### Concert Information
* See the venue location using a google map
* Listen to songs by the artist using an embedded spotify widget
* Comment on the concert if logged in as a GigGoer or Venue
* Leave a rating on a concert from 1-5 if logged in as a GigGoer (disabled for venues)
* See the average rating for the concert
* View other GigGoers that have also bookmarked the concert
* Access a URL to tickets on an external site
* See description about a venue
* See concert details
* Add/remove bookmarks on concerts
![Screenshot of concert page](https://i.imgur.com/e3WQS4c.jpg)

#### Add/Edit Concert
* To access this page you must be logged in as a venue
* Allows venues to add concerts which they are hosting
![Screenshot of add concert page](https://i.imgur.com/6tz2Vza.png)

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
* jQuery | https://jquery.com | javascript library for html document traversal and manipulation
* Font Awesome | https://fontawesome.com | public domain icons
* popper.js | https://popper.js.org | used to manage poppers on different pages
