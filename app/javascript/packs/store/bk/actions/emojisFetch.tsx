import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getEmojis} from '~/api'
import {RootState} from '~/store'

function _emojisFetchThunk() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(emojisFetch.next())

    try {
      const emojis = await getEmojis(getState().system.bkApiToken)
      dispatch(emojisFetch.complete(emojis))
    } catch (error) {
      dispatch(emojisFetch.error(error))
    }
  }
}

export const emojisFetch = Object.assign(_emojisFetchThunk, {
  next: createActionCreator('EMOJIS_FETCH_NEXT'),
  complete: createActionCreator(
    'EMOJIS_FETCH_COMPLETE',
    resolve => (emojis: {}) => resolve(emojis)
  ),
  error: createActionCreator('EMOJIS_FETCH_ERROR', resolve => error =>
    resolve(error)
  ),
})

