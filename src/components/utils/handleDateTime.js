import moment from 'moment'
import { dateTime } from '../index'
export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
    +valueOne.replace(':', '') < +valueTwo.replace(':', '')
    ? { color: 'red' }
    : null
}
export const checkInvalidTime = (time) => {
  return time ? dateTime.formatTime(time) : '--:--'
}
