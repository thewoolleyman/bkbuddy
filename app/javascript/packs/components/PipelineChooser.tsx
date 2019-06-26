import * as React from 'react'
import {BkState, pipelinesFetchAll, RootState, UiState} from '../store'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Classes, Intent, UL} from '@blueprintjs/core'

export type PipelineChooserStateProps = {
  bk: BkState,
  ui: UiState,
}
export type PipelineChooserDispatchProps = ReturnType<typeof mapDispatchToProps>

export type PipelineChooserProps = PipelineChooserStateProps & PipelineChooserDispatchProps

function PipelineChooser(props: PipelineChooserProps) {
  return (
    <div>
      <Button
        id='pipelines-fetch-all'
        intent={Intent.PRIMARY}
        onClick={props.pipelinesFetchAll}
        disabled={props.ui.fetchingAllPipelines}
        text={props.ui.fetchingAllPipelines ? 'fetching...' : 'Read pipelines from Buildkite'}
      />
      <UL className={Classes.HEADING}>
        {
          props.bk.pipelines.map((pipeline) =>
            <li key={pipeline.uuid}>{pipeline.uuid} - {pipeline.name}</li>
          )
        }
      </UL>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  bk: state.bk,
  ui: state.ui,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      pipelinesFetchAll,
    },
    dispatch
  )
}

export default connect<PipelineChooserStateProps,
  PipelineChooserDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PipelineChooser)
