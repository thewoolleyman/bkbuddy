import {createActionCreator} from 'deox'

// This action forces errors for use in system integration testing
export const TestErrorsForce = {
  clientAction: createActionCreator('TestErrorsForce:ClientAction'),
  serverAction: createActionCreator('ServerReq:TestErrorsForce:ServerAction'),
  serverError: createActionCreator('ServerResp:TestErrorsForce:ServerError',
    resolve => (action) => resolve(action)
  )
}
