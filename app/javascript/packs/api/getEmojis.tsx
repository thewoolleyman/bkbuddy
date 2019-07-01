import runBkRestApiCall from '~/api/runBkRestApiCall'
import {orgSlug} from '~/api/vars'

export async function getEmojis(bkApiToken: string): Promise<{}> {
  const data = await runBkRestApiCall(bkApiToken, `/organizations/${orgSlug}/emojis`)
  return data.reduce((emojisByName, emoji) => {
      emojisByName[emoji.name] = emoji.url
      return emojisByName
    }
    , {})
}

