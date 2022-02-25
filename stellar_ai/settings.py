from pathlib import Path
# from .local_settings import *
from django.contrib.messages import constants as message_constants

import os
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-a1&)8f(wb1h-3)5)grmf^kp*3-7^@7$22&pj27cx92bybn_o0-'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions', # it is replaced with user_session module
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sessions',
    # Django Apps
    'home',
    'users',
    'chat',
    'order',
    'analytics',
    'post',
    'competition',
    'paywix',

    # Third Party Modules
    'crispy_forms',  # crispy forms
    'ckeditor',  # Rich text editor
    'social_django',  # Social Login
    'django_filters',  # Filters
    'widget_tweaks',  # Widget Tweaks
    'maintenance_mode',  # maintenance_mode
    'debug_toolbar',  # Debug Toolbar
    'channels', # Channels for chat
    'rest_framework',
    'django_user_agents',
    'user_sessions',
    'oauth2_provider',
    'corsheaders',
    "push_notifications",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'django.contrib.sessions.middleware.SessionMiddleware', # it is replaced with user_sessions
    'user_sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # Third party
    'maintenance_mode.middleware.MaintenanceModeMiddleware',  # Maintenance
    'debug_toolbar.middleware.DebugToolbarMiddleware',  # Debugger
    'django_user_agents.middleware.UserAgentMiddleware',
    'oauth2_provider.middleware.OAuth2TokenMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]
X_FRAME_OPTIONS = 'ALLOWALL'
XS_SHARING_ALLOWED_METHODS = ['POST','GET','OPTIONS', 'PUT', 'DELETE']
SESSION_ENGINE = 'user_sessions.backends.db'
SILENCED_SYSTEM_CHECKS = ['admin.E410']
AUTHENTICATION_BACKENDS = (
    'oauth2_provider.backends.OAuth2Backend',
    'social_core.backends.facebook.FacebookOAuth2',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.linkedin.LinkedinOAuth2',

    'django.contrib.auth.backends.ModelBackend',
)

ROOT_URLCONF = 'stellar_ai.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # Context Processors django custom
                'home.context_processors.get_current_year_to_context',  # Current Year
                'home.context_processors.get_email',  # Email Support
                'home.context_processors.get_website_url',  # Website url (sitemap)

                # Context Processors for Social Base
                'home.context_processors.get_new_messages',  # New messages received
                'home.context_processors.get_friend_requests',  # New friend requests

                # Third Party
                'social_django.context_processors.backends',  # Social Django
                'social_django.context_processors.login_redirect',  # Social Django
                'maintenance_mode.context_processors.maintenance_mode',  # maintenance_mode
            ],
        },
    },
]


#DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'stellar',
#         'USER': 'postgres',
#         'PASSWORD': 'siteguide',
#         'HOST': 'localhost',
#         'PORT': 5432,
#     }
# }


DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.postgresql_psycopg2',
         'NAME': 'myproject',
         'USER': 'sgstellar',
         'PASSWORD': 'SG@stellar101',
         'HOST': 'localhost',
         'PORT': '5432',
     }
 }

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

CRISPY_TEMPLATE_PACK = 'bootstrap4'  # To use Bootstrap
MESSAGE_TAGS = {message_constants.ERROR: 'danger'}


SITE_ID = 1
LANGUAGE_CODE = 'en-IN'
TIME_ZONE = 'Asia/Calcutta'  # Indian time
USE_TZ = True
USE_I18N = False
USE_L10N = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Channel
# TODO for production setup redis server
#WSGI_APPLICATION = 'stellar_ai.wsgi.application'
ASGI_APPLICATION = "stellar_ai.asgi.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

#CACHES = {
#    "default": {
#        "BACKEND": "django_redis.cache.RedisCache",
#        "LOCATION": "redis://127.0.0.1:6379/1",
#        "OPTIONS": {
#            "CLIENT_CLASS": "django_redis.client.DefaultClient"
#        },
#        "KEY_PREFIX": "example"
#    }
#}
#CHANNEL_LAYERS = {
#   'default': {
#       'BACKEND': 'channels.layers.InMemoryChannelLayer'
#   },
#}

#CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': '127.0.0.1:11211',
#     }
# }
#USER_AGENTS_CACHE = 'default'




# User Model
AUTH_USER_MODEL = 'users.User'  # Custom User Model

# BootStrap
CRISPY_TEMPLATE_PACK = 'bootstrap4'  # To use Bootstrap

LOGIN_URL = 'user:login'  # Login URL
LOGOUT_URL = 'user:login'  # Logout URL
LOGIN_REDIRECT_URL = '/'  # Redirect after login
LOGOUT_REDIRECT_URL = 'user:login'

# Basic Static and Media Files settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Email sending settings
DEFAULT_FROM_EMAIL='info@stellar-ai.in'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtpout.secureserver.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'info@stellar-ai.in'
EMAIL_HOST_PASSWORD = 'Stellar.AI@101'

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    # 'social_core.pipeline.user.get_username',
    'users.utils.get_username',  # custom get_username
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'users.utils.pipeline_send_verification_email',  # send activation link
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
)

SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

SOCIAL_AUTH_URL_NAMESPACE = "user:social"

SOCIAL_AUTH_JSONFIELD_ENABLED = True
SOCIAL_AUTH_NEW_USER_REDIRECT_URL = 'user:oauth-register'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '188512718879-54m4st7fpo7ts7jbb8kl4qvmofup95hs.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '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'

# SOCIAL_AUTH_PROTECTED_USER_FIELDS = ['first_name', 'last_name']
USER_FIELDS = ['email', 'username']
LOGIN_ERROR_URL = 'user:login'

# WEB PUSH
PUSH_NOTIFICATIONS_SETTINGS = {
    'FCM_API_KEY': 'AAAAWo7t_nQ:APA91bHE2y_d4XcK74nOd70wtcMUkWI_s15qYBdYMezTbkMIW5aafXaUlJTm41JAvFukTUTkwIiooxGVL4K0S7dMwcsQ6ctV2GvCTW2IEsD91lyQRhW6rhCiGSG5pyW-mgFkgHxhYzX1',
    'FCM_POST_URL': 'https://fcm.googleapis.com/fcm/send',
    'UPDATE_ON_DUPLICATE_REG_ID':True,
}

PAYU_CONFIG = {
    "merchant_key": "PIJcFM",
    "merchant_salt": "2Et6VAHZYmQHudFXzKqOs7WZTJ1Ktu3K",
    "mode": "test",
    "success_url": "https://stellar-ai.in/order/payment/response/",
    "failure_url": "https://stellar-ai.in/order/payment/response/"
}

# Change the PAYU_MODE to 'LIVE' for production.
PAYU_MODE = "LIVE"
SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_SECURE = False
