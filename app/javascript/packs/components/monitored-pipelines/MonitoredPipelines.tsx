import * as React from 'react'
import {BkState, monitoredPipelineDelete, RootState} from '../../store'
import {connect} from 'react-redux'
import {Icon, Intent, UL} from '@blueprintjs/core'
import {bindActionCreators} from 'redux'

export type MonitoredPipelinesStateProps = {
  bk: BkState,
}
export type MonitoredPipelinesDispatchProps = ReturnType<typeof mapDispatchToProps>

export type MonitoredPipelinesProps = MonitoredPipelinesStateProps & MonitoredPipelinesDispatchProps

function MonitoredPipelines(props: MonitoredPipelinesProps) {
  return (
    <div>
      <h3>2. Review Monitored Pipelines for Flaky Builds:</h3>
      <UL>
        {
          props.bk.monitoredPipelines.map((pipeline) =>
            <li className='monitored-pipeline' key={pipeline.uuid}>
              {pipeline.uuid} - {pipeline.name} {' '}
              <a onClick={() => props.monitoredPipelineDelete(pipeline.uuid)}>
                <Icon icon='trash' iconSize={16} intent={Intent.NONE}/>
              </a>
            </li>
          )
        }
      </UL>
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
