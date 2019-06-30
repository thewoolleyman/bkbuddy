class MainChannel < ApplicationCable::Channel
  include ActionView::Helpers::UrlHelper

  def subscribed
    stream_from private_queue
    stream_from "main"
  end

  def receive(action)
    logger.info "CABLECAR SERVER ACTION: #{action['type']}"

    case action["type"]

    when "SERVER_GET_INITIAL_STATE"
      # noinspection RubyResolve
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SET_INITIAL_SYSTEM_STATE",
          payload: {
            bkApiToken: Rails.application.credentials.BUILDKITE_API_TOKEN!,
            userName: user.fetch(:name),
            logoutLink: url_for(ENV['OKTA_URL'] + "/login/signout?fromURI=" + connection.env['HTTP_ORIGIN'] + "/logout"),
            connected: true,
          }
        }
      )
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SET_INITIAL_BK_STATE",
          payload: {
            monitoredPipelines: MonitoredPipeline.order(:name).all
          }
        }
      )

    when "SERVER_MONITORED_PIPELINE_CREATE"
      payload = action.fetch('payload')
      pipeline = MonitoredPipeline.create!(
        uuid: payload.fetch('uuid'),
        name: payload.fetch('name'),
      )
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "MONITORED_PIPELINE_CREATE_COMPLETE",
          payload: {
            pipeline: pipeline.attributes,
          }
        }
      )

    when "SERVER_MONITORED_PIPELINE_DELETE"
      uuid = action.fetch('payload').fetch('uuid')
      MonitoredPipeline.find(uuid).destroy!
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "MONITORED_PIPELINE_DELETE_COMPLETE",
          payload: {
            uuid: uuid,
          }
        }
      )

    else
      raise "Invalid ActionCable action received: '#{action}'"
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
