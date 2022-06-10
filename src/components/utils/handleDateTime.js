import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
    +valueOne.replace(':', '') < +valueTwo.replace(':', '')
    ? { color: 'red' }
    : null
}
