import * as React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {BkState, RootState, stepsForPipeline} from '~/store'

type StepsStateProps = {
  bk: BkState,
}
type OwnProps = {
  pipelineSlug: string,
}
type StepsDispatchProps = ReturnType<typeof mapDispatchToProps>

type StepsProps = StepsStateProps & OwnProps & StepsDispatchProps

function Steps(props: StepsProps) {
  function parseEmojiImgs(label) {
    // only supports up to two, making a regex to support an arbitrary number of matches would be a lot harder
    // TODO: kinda hacky and non-DRY and doesn't seem to render some labels properly
    const regex = /:([\w+-]+):[^:]:([\w+-]+):/
    const imgs = [];
    let match = regex.exec(label);
    if (match && match[1]) {
      imgs.push(
        <img className='emoji' src={props.bk.emojis[match[1]]} alt={label} key={match[1]}/>
      )
    }
    if (match && match[2]) {
      imgs.push(
        <img className='emoji' src={props.bk.emojis[match[2]]} alt={label} key={match[2]}/>
      )
    }
    return imgs
  }

  return (
    <div>
      <ul>
        {
          // TODO: filter out only steps for pipeline
          stepsForPipeline(props.bk.steps, props.pipelineSlug).map((step) =>
            <li className='step' key={`${props.pipelineSlug}-${step.order}`}>
              {parseEmojiImgs(step.label)}
              {' '}
              <span>{step.command}</span>
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
