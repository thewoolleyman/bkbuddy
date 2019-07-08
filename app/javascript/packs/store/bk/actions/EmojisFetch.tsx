import {createActionCreator} from 'deox'
import {Dispatch} from 'redux'

import {getEmojis} from '~/api'
import {ActionLifecycleMap, RootState} from '~/store'

function emojisFetchThunk() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(EmojisFetch.started())

    try {
      const emojis = await getEmojis(getState().system.bkApiToken)
      dispatch(EmojisFetch.complete(emojis))
    } catch (error) {
      dispatch(EmojisFetch.clientError(error))
    }
  }
}

export const EmojisFetch: ActionLifecycleMap = {
  started: createActionCreator('EmojisFetch:Started'),
  clientAction: emojisFetchThunk,
  complete: createActionCreator(
    'EmojisFetch:Complete',
    resolve => (payload: {}) => resolve(payload)
  ),
  clientError: createActionCreator('EmojisFetch:ClientError', resolve => error =>
    resolve(error)
  ),
}

