class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :load_user_from_session

  private

  def load_user_from_session
    if session[:oktastate]
      @user = session[:oktastate].dig(:extra, :raw_info)
    else
      redirect_to "/login"
    end
  end
end
