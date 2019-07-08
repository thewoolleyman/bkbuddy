import {Icon, Intent} from '@blueprintjs/core'
import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {BkState, MonitoredPipelineDelete, PipelineStepsFetch, RootState} from '~/store'
import Steps from '../steps/Steps'

type MonitoredPipelinesStateProps = {
  bk: BkState,
}
type MonitoredPipelinesDispatchProps = ReturnType<typeof mapDispatchToProps>

type MonitoredPipelinesProps = MonitoredPipelinesStateProps & MonitoredPipelinesDispatchProps

function MonitoredPipelines(props: MonitoredPipelinesProps) {
  return (
    <div>
      <h3>2. Review Monitored Pipelines for Flaky Builds:</h3>
      <ul>
        {
          props.bk.monitoredPipelines.map((pipeline) =>
            <li className='monitored-pipeline' key={pipeline.slug}>
              {pipeline.slug} - {pipeline.name} {' '}
              <a onClick={() => props.pipelineFetchStepsClientAction(pipeline.slug)}>
                <Icon className='refreshSteps' icon='refresh' iconSize={16} intent={Intent.NONE}/>
              </a>
              {' '}
              <a onClick={() => props.monitoredPipelineDeleteServerAction(pipeline.slug)}>
                <Icon className='trashMonitoredPipeline' icon='trash' iconSize={16} intent={Intent.NONE}/>
              </a>
              <Steps pipelineSlug={pipeline.slug}/>
            </li>
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  bk: state.bk,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      pipelineFetchStepsClientAction: PipelineStepsFetch.clientAction,
      monitoredPipelineDeleteServerAction: MonitoredPipelineDelete.clientAction,
    },
    dispatch
  )
}

export default connect<MonitoredPipelinesStateProps,
  MonitoredPipelinesDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(MonitoredPipelines)
