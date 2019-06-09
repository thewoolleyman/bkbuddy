module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user

    def connect
      self.user = get_current_user
    end

    private

    def get_current_user
      if Rails.env.test?
        oktastate = $test_fixture_user
      else
        oktastate = env['rack.session'][:oktastate]
      end

      if oktastate
        oktastate&.symbolize_keys!
      else
        reject_unauthorized_connection
      end
    end
  end
end
