import moment from 'moment'

export const formatDateTimeType = 'YYYY-MM-DD H:mm:s'
export const formatTimeType = 'HH:mm'
export const formatDateType = 'YYYY-MM-DD'

export const formatDateTime = (value) => {
  return moment(value).format(formatDateTimeType)
}
export const formatTime = (value) => {
  return moment(value).format(formatTimeType)
}
export const formatDate = (value) => {
  return moment(value).format(formatDateType)
}

export const formatTimestampToDate = (value) => {
  return moment.unix(value).format(formatDateType)
}

export const momentType = (value) => {
  return moment(value, formatTimeType)
}
