from pathlib import Path
# from .local_settings import *

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

    # Django Apps
    'home',
    'users',
    'chat',
    'order',
    'analytics',
    'post',
    'competition',

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
X_FRAME_OPTIONS = 'SAMEORIGIN'
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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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


SITE_ID = 1
LANGUAGE_CODE = 'en-IN'
TIME_ZONE = 'Asia/Calcutta'  # Indian time
USE_TZ = True
USE_I18N = False
USE_L10N = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Channel
# TODO for production setup redis server
WSGI_APPLICATION = 'stellar_ai.wsgi.application'
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
#    'default': {
#        'BACKEND': 'channels.layers.InMemoryChannelLayer'
#    },
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
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtpout.secureserver.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'info@stellar-ai.in'
EMAIL_HOST_PASSWORD = 'Stellar.AI@101'

