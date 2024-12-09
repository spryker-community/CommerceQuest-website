const reSplitAlphaNumeric = /([0-9]+)/gm

// Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity
function compareAlphanumeric(aStr: string, bStr: string) {
  // Split on number groups, but keep the delimiter
  // Then remove falsey split values
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean)
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean)

  // While
  while (a.length && b.length) {
    const aa = a.shift()!
    const bb = b.shift()!

    const an = parseInt(aa, 10)
    const bn = parseInt(bb, 10)

    const combo = [an, bn].sort()

    // Both are string
    if (isNaN(combo[0]!)) {
      if (aa > bb) {
        return 1
      }
      if (bb > aa) {
        return -1
      }
      continue
    }

    // One is a string, one is a number
    if (isNaN(combo[1]!)) {
      return isNaN(an) ? -1 : 1
    }

    // Both are numbers
    if (an > bn) {
      return 1
    }
    if (bn > an) {
      return -1
    }
  }

  return a.length - b.length
}

export {
  compareAlphanumeric,
};