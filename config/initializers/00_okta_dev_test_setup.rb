if Rails.env.development? || Rails.env.test?
  ENV['OKTA_CLIENT_ID'] = '0oal24nfloQo0tAZ30h7'
  ENV['OKTA_ORG'] = 'dev-479894-admin'
  ENV['OKTA_DOMAIN'] = 'oktapreview'
  ENV['OKTA_URL'] = 'https://dev-479894.oktapreview.com'
  ENV['OKTA_ISSUER'] = 'https://dev-479894.oktapreview.com/oauth2/default'
  ENV['OKTA_AUTH_SERVER_ID'] = 'default'
  ENV['OKTA_REDIRECT_URI'] = 'http://localhost:3000/users/auth/oktaoauth/callback'
end