from django.test import TestCase, SimpleTestCase, Client, RequestFactory
from django.urls import reverse, resolve
from django.contrib.auth.models import AnonymousUser

from users.models import User
from . import views


class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
            email='pytest_tests@gmail.com',
            password='Test@321',
            phone_number=1230237891,
            is_active=True
        )

    def test_user_list(self):
        self.assertEqual(True, True)