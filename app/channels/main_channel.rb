class MainChannel < ApplicationCable::Channel
  include ActionView::Helpers::UrlHelper

  def subscribed
    stream_from private_queue
    stream_from "main"
  end

  def receive(action)
    logger.info "CABLECAR SERVER ACTION: #{action['type']}"

    case action["type"]

    when "SERVER_REQ_GET_INITIAL_STATE"
      # noinspection RubyResolve
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SERVER_RESP_SET_INITIAL_SYSTEM_STATE",
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
          type: "SERVER_RESP_SET_INITIAL_BK_STATE",
          payload: {
            monitoredPipelines: MonitoredPipeline.order(:name).all,
            steps: camelize_records(Step.order(:id).all)
          }
        }
      )

    when "SERVER_REQ_MONITORED_PIPELINE_CREATE"
      payload = action.fetch('payload')
      pipeline = MonitoredPipeline.create!(
        slug: payload.fetch('slug'),
        name: payload.fetch('name'),
      )
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SERVER_RESP_MONITORED_PIPELINE_CREATE_COMPLETE",
          payload: {
            pipeline: camelize_record(pipeline),
          }
        }
      )

    when "SERVER_REQ_MONITORED_PIPELINE_DELETE"
      slug = action.fetch('payload').fetch('slug')
      MonitoredPipeline.find(slug).destroy!
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SERVER_RESP_MONITORED_PIPELINE_DELETE_COMPLETE",
          payload: {
            slug: slug,
          }
        }
      )

    when "SERVER_REQ_PIPELINE_FETCH_STEPS"
      step_from_bk = action.fetch('payload')
      persisted_steps = step_from_bk.map do |step|
        Step.find_by_pipeline_slug_and_command(step.fetch('pipelineSlug'), step.fetch('command')) ||
          Step.create!(
            pipeline_slug: step.fetch('pipelineSlug'),
            order: step.fetch('order'),
            label: step.fetch('label'),
            command: step.fetch('command'),
          )
      end
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "SERVER_RESP_PIPELINE_FETCH_STEPS_COMPLETE",
          payload: {
            steps: camelize_records(persisted_steps),
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

  # noinspection RubyBlockToMethodReference
  def camelize_records(records)
    records.map do |record|
      camelize_record(record)
    end
  end

  def camelize_record(record)
    camelize_keys(record.attributes)
  end

  def camelize_keys(hash)
    hash.transform_keys{|key| key.camelize(:lower)}
  end

  def private_queue
    "private___#{user.fetch(:email)}"
  end
end
