class User < ApplicationRecord
  # Note that we never actually persist a user record, or anything about the user.
  # We just store the user info that we get from Devise + Okta OpenID Connect in the session.
  # We don't care about persisting anything about them, only that they successfully authenticated with Okta
  # for this session.

  self.abstract_class = true

  devise :omniauthable, omniauth_providers: [:oktaoauth]
end
