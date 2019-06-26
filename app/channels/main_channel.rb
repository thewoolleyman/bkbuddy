class MainChannel < ApplicationCable::Channel
  include ActionView::Helpers::UrlHelper

  def subscribed
    stream_from private_queue
    stream_from "main"
  end

  def receive(action)
    logger.info "CABLECAR SERVER ACTION: #{action['type']}"

    case action["type"]

    when "SERVER_UPDATE_SYSTEM_STATE"
      ActionCable.server.broadcast(private_queue,
          {
              type: "UPDATE_SYSTEM_STATE",
              payload: {
                  bkApiToken: Rails.application.credentials.BUILDKITE_API_TOKEN!,
                  userName: user.fetch(:name),
                  logoutLink: url_for(ENV['OKTA_URL'] + "/login/signout?fromURI=" + connection.env['HTTP_ORIGIN'] + "/logout"),
                  connected: true,
              }
          }
      )
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def private_queue
    "private___#{user.fetch(:email)}"
  end
end
