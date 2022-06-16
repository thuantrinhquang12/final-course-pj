import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
    +valueOne.replace(':', '') <
      +moment.unix(valueTwo).format('HH:mm').replace(':', '')
    ? { color: 'red', marginLeft: '5px' }
    : { marginLeft: '5px' }
}
