import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
    +valueOne.replace(':', '') <
      +moment.unix(valueTwo).format('H:mm').replace(':', '')
    ? { color: 'red', marginLeft: '5px' }
    : { marginLeft: '5px' }
}
// moment().subtract(1, 'days').format('DD-MM-YYYY') currentime - 1 day
