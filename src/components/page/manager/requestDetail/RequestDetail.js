import React from 'react'
import PropTypes from 'prop-types'

const RequestDetail = ({ row }) => {
  console.log(row)
  return <div>RequestDetail</div>
}

RequestDetail.propTypes = {
  row: PropTypes.object,
}

export default RequestDetail
