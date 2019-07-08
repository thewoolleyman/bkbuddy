import {Position, Toaster} from '@blueprintjs/core'
import {Intent} from '@blueprintjs/core/lib/esm/common/intent'
import * as React from 'react'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ClearErrors, RootState, TestErrorsForce, UiState} from '~/store'

type ErrorsStateProps = {
  ui: UiState,
}

type ErrorsDispatchProps = ReturnType<typeof mapDispatchToProps>

type ErrorsProps = ErrorsStateProps & ErrorsDispatchProps

const toaster = Toaster.create({
  className: 'toaster',
  position: Position.TOP,
})

function Errors(props: ErrorsProps) {
  useEffect(() => {
      const errors = props.ui.errors
      if (errors.length > 0) {
        errors.forEach((error) => {
          toaster.show({
            message: errorMessageToast(error.name, error.message),
            intent: Intent.DANGER,
          })
          console.log(error.name)
          console.log(error.message)
          console.log(error.stack)
        })
        props.clearErrorsClientAction()
      }
    },
    [props.ui.errors])

  return (
    <span>
      <span className='forceServerError' onClick={props.testErrorsForceServerAction}>&nbsp;&nbsp;&nbsp;</span>
      <span className='forceClientError' onClick={props.testErrorsForceClientAction}>&nbsp;&nbsp;&nbsp;</span>
    </span>
  )
}

const mapStateToProps = (state: RootState) => ({
  ui: state.ui,
})

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      clearErrorsClientAction: ClearErrors.clientAction,
      testErrorsForceServerAction: TestErrorsForce.serverAction,
      testErrorsForceClientAction: TestErrorsForce.clientAction,
    },
    dispatch
  )
}

export default connect<ErrorsStateProps,
  ErrorsDispatchProps,
  {},
  RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Errors)

const errorMessageToast = (name: string, message: string) => (
  < div>
    <div>{name}</div>
    <div>{message}</div>
  </div>
)