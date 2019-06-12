class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :load_user_from_session
  before_action :ensure_logged_in

  private

  def load_user_from_session
    if Rails.env.test?
      @user = $test_fixture_user
    else
      @user = session[:oktastate]&.symbolize_keys!
    end
  end

  def ensure_logged_in
    redirect_to "/login" unless @user
  end
end
