import * as React from 'react'
import {BkState, monitoredPipelineCreate, pipelinesFetchAll, RootState, UiState} from '../../store'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, MenuItem} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'
import {Pipeline} from '../../store/bk/state'

export type PipelineSelectStateProps = {
  bk: BkState,
  ui: UiState,
}
export type PipelineSelectDispatchProps = ReturnType<typeof mapDispatchToProps>

export type PipelineSelectProps = PipelineSelectStateProps & PipelineSelectDispatchProps

const BpPipelineSelect = Select.ofType<Pipeline>()

const itemRenderer: ItemRenderer<Pipeline> = (pipeline, {handleClick, modifiers}) => {
  const text = pipeline.name
  return (
    <MenuItem
      className='pipeline-select-item'
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={pipeline.uuid}
      onClick={handleClick}
      text={text}
    />
  );
}

function PipelineSelect(props: PipelineSelectProps) {
  const unmonitoredPipelines = props.bk.pipelines.filter(
    pipeline => !props.bk.monitoredPipelines.map(p => p.uuid).includes(pipeline.uuid)
  )
  return (
    <BpPipelineSelect
      filterable={false}
      items={unmonitoredPipelines}
      itemRenderer={itemRenderer}
      onItemSelect={(pipeline: Pipeline) => props.monitoredPipelineCreate(pipeline.uuid, pipeline.name)}
      noResults={props.ui.fetchingAllPipelines ? 'fetching...' : 'No available pipelines'}
    >
      <Button
        rightIcon='caret-down'
        text='Select a pipeline to monitor'
        onClick={!unmonitoredPipelines.length ? props.pipelinesFetchAll : () => null}
      />
    </BpPipelineSelect>
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
      monitoredPipelineCreate,
    },
    dispatch
  )
}

export default connect<PipelineSelectStateProps,
  PipelineSelectDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PipelineSelect)