from django.test import TestCase
from concert.models import User, GigGoer, Venue
from django.core.files import File
import os


from concert.forms import GigGoerSignUpForm, VenueSignUpForm


'''
tests are located in here and also venue/tests.py
'''

class GigGoerTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="giggoer1", password="strongpass123", email="giggoer1@giggoer1.com", is_venue=False)
        user.save()

        giggoer = GigGoer.objects.create(user=user)
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
        giggoer.image.save('default-pic', File(open(imgpath, 'rb')))
        giggoer.save()

        # test bookmarks, sign out, sign in, registration, test change email, test change image

    def test_register_giggoer(self):
        # TODO register with image and not image and test if image is default one if not uploaded
        form_data = {
            'username': 'test_giggoer',
            'email': 'testgiggoer@testgiggoer.com',
            'password1': 'strongpass123',
            'password2': 'strongpass123'
        }
        form = GigGoerSignUpForm(data=form_data)
        self.assertTrue(form.is_valid())

    def test_user_is_giggoer(self):
        giggoer1 = User.objects.get(username="giggoer1")
        self.assertEqual(giggoer1.is_venue, False)

    def test_giggoer_sign_in(self):
        print("test")



class VenueTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1", password="strongpass123", email="venue1@venue1.com", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        imgpath = os.path.join(os.getcwd(), 'static', 'images', 'default-pic' + ".png")
        venue.image.save('default-pic', File(open(imgpath, 'rb')))
        venue.save()

    def test_register_venue(self):
        form_data = {
            'username': 'test_venue',
            'email': 'testvenue@testvenue.com',
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

    def test_user_is_venue(self):
        venue1 = User.objects.get(username="venue1")
        self.assertEqual(venue1.is_venue, True)


class CommentTests(TestCase):
    print("hi")

class RatingTests(TestCase):
    print("yo")

class ConcertTests(TestCase): # put in venues app
    print("krnfe")


