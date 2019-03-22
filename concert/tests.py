from django.test import TestCase
from concert.forms import GigGoerSignUpForm, VenueSignUpForm, LoginForm, EditGigGoerForm, EditVenueForm
from concert.models import User, GigGoer, Venue, Concert
from django.core.files import File
import os

# all test cases for both the concert and venue app are contained within this file

# all unit tests for giggoer users
class GigGoerTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="giggoer1", email="giggoer1@giggoer1.com", password="strongpass123", is_venue=False)
        user.save()

        giggoer = GigGoer.objects.create(user=user)
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
        giggoer.image.save('default-pic', File(open(imgpath, 'rb')))
        giggoer.save()

    # tests if the register form works for giggoer users
    def test_register_giggoer(self):
        form_data = {
            'username': 'giggoer2',
            'email': 'giggoer2@giggoer2.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = GigGoerSignUpForm(data=form_data)
        self.assertTrue(form.is_valid())

    # tests if the register form does not let users register a giggoer account that already exists
    def test_register_giggoer_duplicate(self):
        form_data = {
            'username': 'giggoer1',
            'email': 'giggoer1@giggoer1.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = GigGoerSignUpForm(data=form_data)
        # return false as this giggoer already exists
        self.assertFalse(form.is_valid())

    # tests if the register form does not let users register a giggoer account with different passwords
    def test_register_giggoer_invalid_password(self):
        form_data = {
            'username': 'giggoer3',
            'email': 'giggoer3@giggoer3.com',
            'password1': 'strongpass123',
            'password2': 'strongpass124'
        }
        form = GigGoerSignUpForm(data=form_data)
        # return false as user's passwords must match
        self.assertFalse(form.is_valid())

    # tests if the sign in form works when signing in as a giggoer user
    def test_giggoer_sign_in(self):
        form_data = {
            'username': 'giggoer1',
            'password': 'strongpass123'
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    # tests if the user object is a giggoer
    def test_user_is_giggoer(self):
        giggoer1 = User.objects.get(username="giggoer1")
        self.assertEqual(giggoer1.is_venue, False)

    # tests if once a user is created, the default image is assigned
    def test_default_giggoer_image(self):
        giggoer1 = User.objects.get(username="giggoer1").giggoer
        self.assertIn('default-pic', giggoer1.image.url)

    # tests if a giggoer can successfully edit their profile
    def test_edit_giggoer(self):
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'concert' + ".jpg")
        form_data = {
            'email': 'newemail@giggoer1.com',
            'image': File(open(imgpath, 'rb')),
            'password': 'newpassword123'
        }
        form = EditGigGoerForm(data=form_data)
        self.assertTrue(form.is_valid())


# all unit tests for venue users
class VenueTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1",  email="venue1@venue1.com", password="strongpass123", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
        venue.image.save('default-pic', File(open(imgpath, 'rb')))
        venue.save()

    # tests if the register form works for venue users
    def test_register_venue(self):
        form_data = {
            'username': 'venue2',
            'email': 'venue2@venue2.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123',
            'venue_name': 'Test Venue',
            'location': 'Timbuktu',
            'website': 'http://example.com',
            'description': 'This is an example venue',
            'phone_number': '123456789',
            'capacity': '5000'
        }
        form = VenueSignUpForm(data=form_data)
        self.assertTrue(form.is_valid())

    # tests if the register form does not let users register a venue account that already exists
    def test_register_venue_duplicate(self):
        form_data = {
            'username': 'venue1',
            'email': 'venue1@venue1.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = VenueSignUpForm(data=form_data)
        # return false as this venue already exists
        self.assertFalse(form.is_valid())

    # tests if the register form does not let users register a venue account with different passwords
    def test_register_venue_invalid_password(self):
        form_data = {
            'username': 'venue3',
            'email': 'venue3@venue3.com',
            'password1': 'strongpass123',
            'password2': 'strongpass124'
        }
        form = VenueSignUpForm(data=form_data)
        # return false as user's passwords must match
        self.assertFalse(form.is_valid())

    # tests if the sign in form works when signing in as a venue user
    def test_venue_sign_in(self):
        form_data = {
            'username': 'venue1',
            'password': 'strongpass123'
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    # tests if the user object is a venue
    def test_user_is_venue(self):
        venue1 = User.objects.get(username="venue1")
        self.assertEqual(venue1.is_venue, True)

    # tests if once a user is created, the default image is assigned
    def test_default_venue_image(self):
        venue1 = User.objects.get(username="venue1").venue
        self.assertIn('default-pic', venue1.image.url)

    # tests if a venue can successfully edit their profile
    def test_edit_venue(self):
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'concert' + ".jpg")
        form_data = {
            'email': 'newemail@venue1.com',
            'image': File(open(imgpath, 'rb')),
            'password': 'newpassword123',
            'venue_name': 'New Venue Name',
            'location': 'A different location',
            'website': 'https://www.blank.org',
            'description': 'This is a new description for the venue',
            'phone_number': '9876543210',
            'capacity': '12345'
        }
        form = EditVenueForm(data=form_data)
        self.assertTrue(form.is_valid())


class CommentTests(TestCase):
    print("hi")


class RatingTests(TestCase):
    # add/remove ratings, average rating


# all unit tests for concerts
class ConcertTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1",  email="venue1@venue1.com", password="strongpass123", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        venue.save()

        giggoer = GigGoer.objects.create(user=user)
        giggoer.save()

        concert = Concert.objects.create(artist="artist1", date="2020-10-10", start_time="20:00", end_time="22:00", url="http://www.exmaple.com", description="This is a description", spotify_URI="spotify", venue=venue)
        concert.save()

    # tests if concert is created successfully
    def test_add_concert(self):
        concert = Concert.objects.get(concertID=1)
        self.assertEqual(concert.artist, "artist1")

    # tests if concert is successfully deleted
    def test_remove_concert(self):
        concert = Concert.objects.get(concertID=1)
        concert.delete()

        try:
            concert = Concert.objects.get(concertID=1)
        except:
            concert = None
        self.assertEqual(concert, None)

    # tests if a concert can be edited
    def test_edit_concert(self):
        concert = Concert.objects.get(concertID=1)
        concert.description = "This is another description"
        concert.save()
        self.assertEqual(concert.description, "This is another description")

    # tests if a concert can be bookmarked
    def test_bookmark_concert(self):
        user = User.objects.get(username="venue1")
        giggoer = GigGoer.objects.get(user=user)
        concert = Concert.objects.get(concertID=1)
        giggoer.bookmarks.add(concert)
        self.assertIn(concert, giggoer.bookmarks.all())

    # tests if a bookmarked concert can be removed
    def test_remove_bookmark_concert(self):
        user = User.objects.get(username="venue1")
        giggoer = GigGoer.objects.get(user=user)
        concert = Concert.objects.get(concertID=1)
        giggoer.bookmarks.remove(concert)
        self.assertFalse(concert in giggoer.bookmarks.all())
