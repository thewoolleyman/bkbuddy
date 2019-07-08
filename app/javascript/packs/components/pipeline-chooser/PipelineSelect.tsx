import {Button, MenuItem} from '@blueprintjs/core'
import {ItemRenderer, Select} from '@blueprintjs/select'
import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {AllPipelinesFetch, BkState, MonitoredPipelineCreate, Pipeline, RootState, UiState} from '~/store'

type PipelineSelectStateProps = {
  bk: BkState,
  ui: UiState,
}
type PipelineSelectDispatchProps = ReturnType<typeof mapDispatchToProps>

type PipelineSelectProps = PipelineSelectStateProps & PipelineSelectDispatchProps

const BpPipelineSelect = Select.ofType<Pipeline>()

const itemRenderer: ItemRenderer<Pipeline> = (pipeline, {handleClick, modifiers}) => {
  const text = pipeline.name
  return (
    <MenuItem
      className='pipeline-select-item'
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={pipeline.slug}
      onClick={handleClick}
      text={text}
    />
  );
}

function PipelineSelect(props: PipelineSelectProps) {
  const unmonitoredPipelines = props.bk.pipelines.filter(
    pipeline => !props.bk.monitoredPipelines.map(p => p.slug).includes(pipeline.slug)
  )
  return (
    <BpPipelineSelect
      filterable={false}
      items={unmonitoredPipelines}
      itemRenderer={itemRenderer}
      onItemSelect={(pipeline: Pipeline) => props.monitoredPipelineCreateClientAction(pipeline.slug, pipeline.name)}
      noResults={props.ui.fetchingAllPipelines ? 'fetching...' : 'No available pipelines'}
    >
      <Button
        rightIcon='caret-down'
        text='Select a pipeline to monitor'
        onClick={!unmonitoredPipelines.length ? props.allPipelinesFetchClientAction : () => null}
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
      allPipelinesFetchClientAction: AllPipelinesFetch.clientAction,
      monitoredPipelineCreateClientAction: MonitoredPipelineCreate.clientAction,
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
