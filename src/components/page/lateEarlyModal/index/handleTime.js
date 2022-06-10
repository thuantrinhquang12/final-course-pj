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
      return hours.toString().length > 1
        ? `${hours}:${minute}`
        : `0${hours}:${minute}`
    } else {
      return minutes.toString().length > 1
        ? `0${hours}:${minutes}`
        : `0${hours}:0${minutes}`
    }
  } else {
    return null
  }
}

export const handlePlusTime = (start, end) => {
  const arr = [end ? end : '00:00', start ? start : '00:00']
  const result = arr.reduce((current, next) => {
    const hours = next.split(':')
    return current + Number(hours[0]) * 60 + Number(hours[1])
  }, 0)

  const hour = Math.floor(result / 60)

  if (hour >= 1) {
    return {
      hours: hour,
      minutes: result - hour * 60,
    }
  } else {
    return {
      hours: hour,
      minutes: result,
    }
  }
}

export const handleFormat = (times) => {
  const hours =
    times.hours.toString().length > 1 ? times.hours : `0${times.hours}`
  const minutes =
    times.minutes.toString().length > 1 ? times.minutes : `0${times.minutes}`
  return `${hours}:${minutes}`
}

export default handleTime
