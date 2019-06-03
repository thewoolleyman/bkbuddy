class SessionsController < ApplicationController
  skip_before_action :ensure_logged_in

  def new
    redirect_to root_path if @user
  end

  def destroy
    session[:oktastate] = nil
    redirect_to "/login"
  end
end
