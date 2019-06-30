class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # noinspection RailsParamDefResolve
  skip_before_action :ensure_logged_in

  def oktaoauth
    session[:oktastate] = request.env["omniauth.auth"].dig(:extra, :raw_info).symbolize_keys!
    redirect_to "/"
  end
end
