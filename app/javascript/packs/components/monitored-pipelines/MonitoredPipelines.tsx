import {Icon, Intent} from '@blueprintjs/core'
import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {BkState, monitoredPipelineDelete, RootState} from '~/store'

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
              <a onClick={() => props.monitoredPipelineDelete(pipeline.slug)}>
                <Icon icon='trash' iconSize={16} intent={Intent.NONE}/>
              </a>
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
      monitoredPipelineDelete,
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
