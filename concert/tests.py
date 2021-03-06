from django.test import TestCase
from concert.forms import GigGoerSignUpForm, VenueSignUpForm, LoginForm, EditGigGoerForm, EditVenueForm
from concert.models import User, GigGoer, Venue, Concert, Rating, Comment, ProfileComment
from django.core.files import File
from django.utils import timezone
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


# all unit tests for comments
class CommentTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1",  email="venue1@venue1.com", password="strongpass123", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        venue.save()

        concert = Concert.objects.create(artist="artist1", date="2020-10-10", start_time="20:00", end_time="22:00", url="http://www.exmaple.com", description="This is a description", spotify_URI="spotify", venue=venue)
        concert.save()

        comment = Comment.objects.create(user=user, text="This is a comment", concert=concert, time=timezone.now())
        comment.save()

    # tests if a user can add a comment
    def test_add_comment(self):
        comment = Comment.objects.get(commentID=1)
        self.assertEqual(comment.text, "This is a comment")

    # test is a comment can be removed
    def test_remove_comment(self):
        user = User.objects.get(username="venue1")
        comment = Comment.objects.get(commentID=1)
        comment.user.delete()

        try:
            comment = Comment.objects.get(concertID=1)
        except:
            comment = None
        self.assertEqual(comment, None)

    # test is a comment can be edited
    def test_edit_comment(self):
        user = User.objects.get(username="venue1")
        comment = Comment.objects.get(commentID=1)
        comment.text = "This is a different comment"
        self.assertEqual(comment.text, "This is a different comment")


# all unit tests for profile comments
class ProfileCommentTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1",  email="venue1@venue1.com", password="strongpass123", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        venue.save()

        profile_comment = ProfileComment.objects.create(user=user, text="This is a profile comment", profile=user, time=timezone.now())
        profile_comment.save()

    # tests if a user can add a profile comment
    def test_add_profile_comment(self):
        profile_comment = ProfileComment.objects.get(commentID=1)
        self.assertEqual(profile_comment.text, "This is a profile comment")

    # test is a profile comment can be removed
    def test_remove_profile_comment(self):
        user = User.objects.get(username="venue1")
        profile_comment = ProfileComment.objects.get(commentID=1)
        profile_comment.user.delete()

        try:
            profile_comment = ProfileComment.objects.get(concertID=1)
        except:
            profile_comment = None
        self.assertEqual(profile_comment, None)

    # test is a profile comment can be edited
    def test_edit_comment(self):
        user = User.objects.get(username="venue1")
        profile_comment = ProfileComment.objects.get(commentID=1)
        profile_comment.text = "This is a different profile comment"
        self.assertEqual(profile_comment.text, "This is a different profile comment")


# all unit tests for ratings
class RatingTests(TestCase):
    def setUp(self):
        user = User.objects.create(username="venue1",  email="venue1@venue1.com", password="strongpass123", is_venue=True)
        user.save()

        venue = Venue.objects.create(user=user)
        venue.save()

        concert = Concert.objects.create(artist="artist1", date="2020-10-10", start_time="20:00", end_time="22:00", url="http://www.exmaple.com", description="This is a description", spotify_URI="spotify", venue=venue)
        concert.save()

        rating1 = Rating.objects.create(user=user, concert=concert, score=1)
        rating1.save()
        rating2 = Rating.objects.create(user=user, concert=concert, score=5)
        rating2.save()

    # tests if a rating can be added to a concert
    def test_add_rating(self):
        rating = Rating.objects.get(ratingID=1)
        self.assertEqual(rating.score, 1)

    # tests if a rating can be removed from a concert
    def test_remove_rating(self):
        user = User.objects.get(username="venue1")
        concert = Concert.objects.get(concertID=1)
        rating = Rating.objects.get(ratingID=1)
        rating.concert.delete()

        try:
            concert = Concert.objects.get(concertID=1)
        except:
            concert = None
        self.assertEqual(concert, None)

    # tests if a rating average is calculated correctly
    def test_average_rating(self):
        rating1 = Rating.objects.get(ratingID=1)
        rating2 = Rating.objects.get(ratingID=2)
        average = (rating1.score + rating2.score) / 2
        self.assertEqual(average, 3)


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
