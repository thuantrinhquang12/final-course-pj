import moment from 'moment'

export const formatDateTimeType = 'YYYY-MM-DD HH:mm'
export const formatTimeType = 'HH:mm'
export const formatDateType = 'YYYY-MM-DD'
export const formatDateTypeDate = 'DD/MM/YYYY'
export const formatDateTypeYear = 'YYYY/MM/DD'
export const formatDateTimeTypeTable = 'DD/MM/YYYY HH:mm'
export const formatDateTypeTable = 'DD/MM/YYYY'

export const formatDateTimes = (value) => {
  return moment(value).format(formatDateTypeDate)
}

export const formatDateTime = (value) => {
  return moment(value).format(formatDateTimeType)
}

export const formatDate = (value) => {
  return moment(value).format(formatDateType)
}

export const formatTime = (value) => {
  return moment(value).format(formatTimeType)
}

export const formatDateTable = (value) => {
  return moment(value).format(formatDateTypeTable)
}

export const formatDateTimeTable = (value) => {
  return moment(value).format(formatDateTimeTypeTable)
}

export const momentType = (value) => {
  return moment(value, formatTimeType)
}
export const timeToDecimal = (t) => {
  const arr = t.split(':')
  const dec = parseInt((arr[1] / 6) * 10, 10)
  return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec)
}

export const momentTypeDate = (value) => {
  return moment(value, formatDateTypeYear)
}
