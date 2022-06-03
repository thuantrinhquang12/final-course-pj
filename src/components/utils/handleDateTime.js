import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

export const compareTime = (valueOne, valueTwo) => {
  return valueOne &&
    valueTwo &&
    +valueOne.replace(':', '') <
<<<<<<< HEAD
      +moment.unix(valueTwo).format('H:mm').replace(':', '')
    ? { color: 'red', marginLeft: '5px' }
    : { marginLeft: '5px' }
}
// moment().subtract(1, 'days').format('DD-MM-YYYY') currentime - 1 day
=======
      +moment.unix(valueTwo).format('HH:mm').replace(':', '')
    ? { color: 'red', marginLeft: '5px' }
    : { marginLeft: '5px' }
}
>>>>>>> b4095e29d9551734ea081ca64b357726bcf55e80
