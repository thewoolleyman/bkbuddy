class SessionsController < ApplicationController
  skip_before_action :load_user_from_session

  def destroy
    session[:oktastate] = nil
    redirect_to "/login"
  end
end
