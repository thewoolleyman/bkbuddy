import * as React from 'react'

function emojiImg(emojiSrc, label, emojiText) {
  return <img className='emoji' src={emojiSrc} alt={label} key={emojiText}/>
}

export function emojiImgsForStep(step, emojis) {
  const label = step.label
  // NOTE: Only supports up to four emojis.  Supporting an arbitrary number of matches would be harder.
  // See: https://stackoverflow.com/questions/37003623/how-to-capture-multiple-repeated-groups#comment92235723_37004214
  const emojiRegexPattern = '(?::([\\w+]+):)?[^:]*'
  const regex = RegExp(`${emojiRegexPattern}${emojiRegexPattern}${emojiRegexPattern}${emojiRegexPattern}`)
  const imgs = [];
  const match = regex.exec(label);
  if (match) {
    [1, 2, 3, 4].forEach((i) => {
      if (match[i]) {
        const emojiText = match[i]
        imgs.push(emojiImg(emojis[emojiText], label, emojiText))
      }
    })
  }
  return imgs
}
