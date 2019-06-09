class MainChannel < ApplicationCable::Channel
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
                  loggedIn: true,
                  bkApiToken: Rails.application.credentials.BUILDKITE_API_TOKEN!,
                  userName: user.fetch(:email),
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
