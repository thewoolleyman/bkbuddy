class MainChannel < ApplicationCable::Channel
  include ActionView::Helpers::UrlHelper

  def subscribed
    stream_from private_queue
    stream_from "main"
  end

  def receive(action)
    logger.info "CABLECAR SERVER ACTION: #{action['type']}"

    case @action_type = action["type"]

    when "ServerReq:SystemStateInitialize:ServerAction"
      # noinspection RubyResolve
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "ServerResp:SystemStateInitialize:Complete",
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
          type: "ServerResp:BkStateInitialize:Complete",
          payload: {
            monitoredPipelines: MonitoredPipeline.order(:name).all,
            steps: camelize_records(Step.order(:id).all)
          }
        }
      )

    when "ServerReq:MonitoredPipelineCreate:ServerAction"
      payload = action.fetch('payload')
      pipeline = MonitoredPipeline.create!(
        slug: payload.fetch('slug'),
        name: payload.fetch('name'),
      )
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "ServerResp:MonitoredPipelineCreate:Complete",
          payload: {
            pipeline: camelize_record(pipeline),
          }
        }
      )

    when "ServerReq:MonitoredPipelineDelete:ServerAction"
      slug = action.fetch('payload').fetch('slug')
      MonitoredPipeline.find(slug).destroy!
      ActionCable.server.broadcast(
        private_queue,
        {
          type: "ServerResp:MonitoredPipelineDelete:Complete",
          payload: {
            slug: slug,
          }
        }
      )

    when "ServerReq:PipelineStepsFetch:ServerAction"
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
          type: "ServerResp:PipelineStepsFetch:Complete",
          payload: {
            steps: camelize_records(persisted_steps),
          }
        }
      )

    when "ServerReq:TestErrorsForce:ServerAction"
      raise 'Forced server error for use in system integration testing'

    else
      raise "Invalid ActionCable action received: '#{action}'"
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def handle_error(error)
    error_action_type = @action_type.gsub('ServerReq', 'ServerResp').gsub('ServerAction', 'ServerError')
    error_hash = {
      name: error.class.name,
      message: error.message,
      stack: error.backtrace&.map(&:to_s).join("\n")
    }
    ActionCable.server.broadcast(
      private_queue,
      {
        type: error_action_type,
        error: error_hash
      }
    )
  end

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
    hash.transform_keys {|key| key.camelize(:lower)}
  end

  def private_queue
    "private___#{user.fetch(:email)}"
  end
end
