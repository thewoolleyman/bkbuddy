class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :load_user_from_session

  def oktaoauth
    session[:oktastate] = request.env["omniauth.auth"]
    redirect_to "/"
  end
end
