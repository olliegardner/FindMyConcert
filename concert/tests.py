from django.test import TestCase
from concert.forms import GigGoerSignUpForm, VenueSignUpForm, LoginForm, EditGigGoerForm, EditVenueForm
from concert.models import User, GigGoer, Venue
from django.core.files import File
import os

'''
tests are located in here and also venue/tests.py
'''

# all unit tests for giggoer users
class GigGoerTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="giggoer1", email="giggoer1@giggoer1.com", password="strongpass123", is_venue=False)
        user.save()

        giggoer = GigGoer.objects.create(user=user)
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
        giggoer.image.save('default-pic', File(open(imgpath, 'rb')))
        giggoer.save()

        # test bookmarks, sign out, sign in, registration, test change email, test change image, edit user forms

    def test_register_giggoer(self):
        # TODO register with image and not image and test if image is default one if not uploaded

        # tests if the register form works for giggoer users
        form_data = {
            'username': 'giggoer2',
            'email': 'giggoer2@giggoer2.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = GigGoerSignUpForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_register_giggoer_duplicate(self):
        # tests if the register form does not let users register a giggoer account that already exists
        form_data = {
            'username': 'giggoer1',
            'email': 'giggoer1@giggoer1.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = GigGoerSignUpForm(data=form_data)
        # return false as this giggoer already exists
        self.assertFalse(form.is_valid())

    def test_register_giggoer_invalid_password(self):
        # tests if the register form does not let users register a giggoer account with different passwords
        form_data = {
            'username': 'giggoer3',
            'email': 'giggoer3@giggoer3.com',
            'password1': 'strongpass123',
            'password2': 'strongpass124'
        }
        form = GigGoerSignUpForm(data=form_data)
        # return false as user's passwords must match
        self.assertFalse(form.is_valid())


    def test_giggoer_sign_in(self):
        # tests if the sign in form works when signing in as a giggoer user
        form_data = {
            'username': 'giggoer1',
            'password': 'strongpass123'
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_user_is_giggoer(self):
        # tests if the user object is a giggoer
        giggoer1 = User.objects.get(username="giggoer1")
        self.assertEqual(giggoer1.is_venue, False)

    def test_default_giggoer_image(self):
        # tests if once a user is created, the default image is assigned
        giggoer1 = User.objects.get(username="giggoer1").giggoer
        self.assertIn('default-pic', giggoer1.image.url)

    def test_edit_giggoer(self):
        # tests if a giggoer can successfully edit their profile
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

    def test_register_venue(self):
        # tests if the register form works for venue users
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

    def test_register_venue_duplicate(self):
        # tests if the register form does not let users register a venue account that already exists
        form_data = {
            'username': 'venue1',
            'email': 'venue1@venue1.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = VenueSignUpForm(data=form_data)
        # return false as this venue already exists
        self.assertFalse(form.is_valid())

    def test_register_venue_invalid_password(self):
        # tests if the register form does not let users register a venue account with different passwords
        form_data = {
            'username': 'venue3',
            'email': 'venue3@venue3.com',
            'password1': 'strongpass123',
            'password2': 'strongpass124'
        }
        form = VenueSignUpForm(data=form_data)
        # return false as user's passwords must match
        self.assertFalse(form.is_valid())

    def test_venue_sign_in(self):
        # tests if the sign in form works when signing in as a venue user
        form_data = {
            'username': 'venue1',
            'password': 'strongpass123'
        }
        form = LoginForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_user_is_venue(self):
        # tests if the user object is a venue
        venue1 = User.objects.get(username="venue1")
        self.assertEqual(venue1.is_venue, True)

    def test_default_venue_image(self):
        # tests if once a user is created, the default image is assigned
        venue1 = User.objects.get(username="venue1").venue
        self.assertIn('default-pic', venue1.image.url)

    def test_edit_venue(self):
        # tests if a venue can successfully edit their profile
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
    print("yo")


class ConcertTests(TestCase): # put in venues app
    print("krnfe")


