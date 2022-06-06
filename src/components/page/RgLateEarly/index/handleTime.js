import moment from 'moment'

const handleTime = (startTime, endTime) => {
  const start = moment(startTime, 'HH:mm')
  const end = moment(endTime, 'HH:mm')
  if (start.isBefore(end)) {
    const hours = Math.abs(start.diff(end, 'hours'))
    const minutes = Math.abs(start.diff(end, 'minutes'))
    if (hours !== 0) {
      const minute =
        (hours * 60 - minutes).toString().length > 1
          ? Math.abs(hours * 60 - minutes)
          : `0${hours * 60 - minutes}`
      return minutes.toString().length > 1
        ? `0${hours}:${minute}`
        : `${hours}:${minute}`
    } else {
      return minutes.toString().length > 1
        ? `0${hours}:${minutes}`
        : `0${hours}:0${minutes}`
    }
  } else {
    return null
  }
}

export default handleTime
