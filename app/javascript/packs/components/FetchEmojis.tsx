import * as React from 'react'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {EmojisFetch, RootState, SystemState} from '~/store'

type AppInitStateProps = {
  system: SystemState,
}

type AppInitDispatchProps = ReturnType<typeof mapDispatchToProps>

type AppInitProps = AppInitStateProps & AppInitDispatchProps

function AppInit(props: AppInitProps) {
  useEffect(() => {
      if (props.system.bkApiToken) {
        props.emojisFetchClientAction()
      }
    },
    [props.system.bkApiToken])
  return (<div/>)
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      emojisFetchClientAction: EmojisFetch.clientAction,
    },
    dispatch
  )
}

export default connect<AppInitStateProps,
  AppInitDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(AppInit)
