# This is how we tell Jupyter to use OAuth instead of the default
# authentication which is done using local Linux user accounts.
c.JupyterHub.authenticator_class = 'oauthenticator.generic.GenericOAuthenticator'

# Where should Django pass the authentication results back to?
c.GenericOAuthenticator.oauth_callback_url = 'http://localhost:8010/hub/oauth_callback'

# What is the client ID and client secret for Jupyterhub provided Django?

c.GenericOAuthenticator.client_id = '3nwbjOYZU0OIxy9djBss2rfXCzUJBNUkpPo98yzZ'
c.GenericOAuthenticator.client_secret = '6pldQ9jecZT7egLmkbpiHFFZuWxIgJeO0WwWT0VtHC7Yw0WxBUfSdU45bzI4CjxzISVPkJxrehw5sOX9fBd3fpQml2p4BRxA9BekZohg4LkXxW4zaUUp8HywCezcZyqf'

# Where can Jupyterhub get the token from?
c.GenericOAuthenticator.token_url = 'http://localhost:8000/o/token/'

# Where can it get the user name from? What method shall it use?
# What key in the JSON output is the username?
c.GenericOAuthenticator.userdata_url = 'http://localhost:8000/user/userdata'
c.GenericOAuthenticator.userdata_method = 'GET'
c.GenericOAuthenticator.userdata_params = {}
c.GenericOAuthenticator.username_key = 'username'

# What address will Jupyterhub be accessed from?
c.JupyterHub.bind_url = 'http://localhost:8010'


from notebook.auth import passwd

c = get_config()
c.NotebookApp.open_browser=False
c.NotebookApp.ip='*' # Allows access from anywhere
c.NotebookApp.port=8885 # Jupyter runs in port 8885
c.NotebookApp.password=passwd('jupyter') # Password to access notebooks



# By default Jupyterhub requires that a Linux user exist for every
# authenticated user. For testing, we are going to trick JupyterHub
# to merely pretend that such a user exists and launch notebook servers
# for the same user running the hub process itself!
from jupyterhub.spawner import LocalProcessSpawner

class SameUserSpawner(LocalProcessSpawner):
    """Local spawner that runs single-user servers as the same user as the Hub itself.

    Overrides user-specific env setup with no-ops.
    """

    def make_preexec_fn(self, name):
        """no-op to avoid setuid"""
        return lambda : None

    def user_env(self, env):
        """no-op to avoid setting HOME dir, etc."""
        return env

c.JupyterHub.spawner_class = SameUserSpawner