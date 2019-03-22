# FindMyConcert


Welcome to FindMyConcert!
This is a university project created by Ollie Gardner, Axel Stjerngren, Robert Pringle, Patryk Kaczmarczyk and Andrew Finlayson for the Web Application Development course 
at the University of Glasgow. The premise of the website is to allow users to find concerts in their 
local area and for venues to be able to easily add new concerts.

If you don't want to run the site locally then you can visit FindMyConcert @ https://findmyconcert.pythonanywhere.com

## Installation

First clone the repository and then navigate to the FindMyConcert source folder.

```
pip install -r requirements.txt

python manage.py makemigrations concert

python manage.py migrate
```

(Optional) Now you can run the population script. Please note that db.sqlite3 has to be deleted each time you run this script as the database does not allow duplicate entries.
```
python population_script.py
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
* Light/dark mode

#### Events
* Search available concerts (also by location using ip-api)
* Filter available concerts
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
![Screenshot of contact page](https://i.imgur.com/oVzuRov.jpg)

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

### The maths behind the discover page

The discover page recommends you artists which you have not yet bookmarked. It recommends these artists by correlating your ratings with other users who have rated concerts in a similar fashion as you.

The recommender engine uses a mathematical operation called singular value matrix decomposition (henceforth SVD). All user ratings are stored in a  matrix where each row represents a unique user and each column represents a unique artist. Missing ratings (all occurrences where a user has not rated a user) are called latent factors. Most ratings in the matrix are latent factors, so the matrix is a sparse matrix.

![Singular Value Decomposition](http://www.cs.carleton.edu/cs_comps/0607/recommend/recommender/images/svd2.png)

In SVD the ratings matrix (x̂) is decomposed into three lower dimensional matrices. U is the matrix which represents the relationship between users and latent factors. S is a diagonal matrix which (essentially) represents the weights of each rating. The last matrix VT is a right singular matrix, this represents the relationship between artists and the latent factors. We decompose the ratings matrix with a rank K = 5 and then multiply U, S and VT  back together to get the rank K approximation of the ratings matrix. 

Now all the latent factors are filled in with a value which should approximately represent the rating each user would have given the artist in question. Now a row which represents a user can be extracted, transposed and sorted to find teh aritists which the user might enjoy.

One issue is that these matrices are not automatically generated, so new users and artists require that a special script is run to ensure that the matrix includes all the new data.

```
python update_ratings.py
```
### Compact Mode

- The compact/pretty mode button switches between the two modes
- The webapp is set to pretty mode by default
- The preferred mode is saved in the user model (so only logged in users can switch modes)
- This mode shows concerts in a more concise way, as demonstrated below.

![Screenshot of compact mode](https://i.imgur.com/BI0nRuI.png)
### Dark Mode

- The button to switch between light and dark mode is in the user dropdown
- The webapp is set to light mode by default
- Again, the preferred mode is saved in the user model
- This mode changes the CSS across the webapp to a dark theme

![Screenshot of dark mode](https://i.imgur.com/gZSEf1k.jpg)
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
* urllib | https://docs.python.org/3/library/urllib.html | package that collects several modules for working with URLs
