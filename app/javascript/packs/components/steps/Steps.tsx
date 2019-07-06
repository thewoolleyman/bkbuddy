import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {BkState, RootState} from '~/store'
import {stepsForPipeline} from '~/util'
import {emojiImgsForStep} from './emojiImgsForStep'

type StepsStateProps = {
  bk: BkState,
}
type OwnProps = {
  pipelineSlug: string,
}
type StepsDispatchProps = ReturnType<typeof mapDispatchToProps>

type StepsProps = StepsStateProps & OwnProps & StepsDispatchProps

function Steps(props: StepsProps) {
  return (
    <div>
      <ul>
        {
          stepsForPipeline(props.bk.steps, props.pipelineSlug).map((step) =>
            <li className='step' key={`${props.pipelineSlug}-${step.order}`}>
              {emojiImgsForStep(step, props.bk.emojis)}
              {' - '}
              <span className='code'>`{step.command}`</span>
            </li>
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  bk: state.bk,
  ...ownProps
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {},
    dispatch
  )
}


export default connect<StepsStateProps,
  StepsDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Steps)
