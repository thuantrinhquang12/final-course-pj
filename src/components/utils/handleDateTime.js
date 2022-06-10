import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
<<<<<<< HEAD
    +valueOne.replace(':', '') <
      +moment.unix(valueTwo).format('HH:mm').replace(':', '')
    ? { color: 'red', marginLeft: '5px' }
    : { marginLeft: '5px' }
=======
    +valueOne.replace(':', '') < +valueTwo.replace(':', '')
    ? { color: 'red' }
    : null
>>>>>>> 81bd95dd502fea952c2df6143579f686bf94eac0
}
