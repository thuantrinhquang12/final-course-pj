import { dateTime } from '../index'

export const checkInvalidTime = (time) => {
  return time ? dateTime.formatTime(time) : '--:--'
}
