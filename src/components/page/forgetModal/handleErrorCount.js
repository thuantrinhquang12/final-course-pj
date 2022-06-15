const errorSystem = 0
const errorCheckIn = 1
const errorCheckOut = 2
const errorBoth = 3

export const getErrorCount = (specialReason) => {
  return specialReason
    ? (specialReason || []).length === 2
      ? errorBoth
      : (specialReason || []).length === 1
      ? specialReason.includes(1)
        ? errorCheckIn
        : specialReason.includes(2)
        ? errorCheckOut
        : errorSystem
      : errorSystem
    : errorSystem
}

export const setErrorCount = (specialReason) => {
  return specialReason
    ? specialReason === errorBoth
      ? [1, 2]
      : specialReason === errorCheckIn
      ? [1]
        ? specialReason === errorCheckOut
        : [2]
      : []
    : []
}
