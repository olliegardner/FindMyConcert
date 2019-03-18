# FindMyConcert


Welcome to FindMyConcert!
This is a univerisity project created by {{ADD NAMES}} for the Web Application Development course 
at the University of Glasgow. The premise of the website is to allow users to find concerts in their 
local area and for venues to be able to easily add new concerts.

###Installation

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

Now if you navigate to http://127.0.0.1:8000/ you should be greeted by a view which looks like this:
###TODO: add screenshot of index
