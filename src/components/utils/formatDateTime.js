import moment from 'moment'

const formatDateTimeType = 'YYYY-MM-DD H:mm:s'
const formatTimeType = 'H:mm'
const formatDateType = 'YYYY-MM-DD'

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
