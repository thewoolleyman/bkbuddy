module ApplicationCable
  class Channel < ActionCable::Channel::Base
    rescue_from RuntimeError, with: :handle_error
  end
end
