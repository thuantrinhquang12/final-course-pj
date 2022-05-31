import moment from 'moment'

export const getCurrentTime = () => moment().format('YYYY-MM-DD H:mm')

// moment().subtract(1, 'days').format('DD-MM-YYYY') currentime - 1 day
