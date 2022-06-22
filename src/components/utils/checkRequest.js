export const checkRequestType = (type) => {
  switch (type) {
    case 1:
      return 'Forget'
    case 2:
    case 3:
      return 'Leave'
    case 4:
      return 'Late/Early'
    case 5:
      return 'OT'
    default:
      break
  }
}

export const checkRequestStatus = (status) => {
  switch (status) {
    case -1:
      return 'Reject'
    case 0:
      return 'Send'
    case 1:
      return 'Confirmed'
    case 2:
      return 'Approved'
    default:
      break
  }
}

export const checkRequestErrorType = (type) => {
  switch (type) {
    case 0:
      return 'Error Member'
    case 1:
    case 2:
    case 3:
      return 'Error System'
    default:
      break
  }
}

export const checkRequestLeave = (value) => {
  return value ? value : 'All day'
}
export const checkRequestLeavePaid = (type) => {
  return type === 2 ? 'Paid' : 'Unpaid'
}

export const checkRequestTwoCondition = (condition, condition2) => {
  return condition || condition2
}

export const checkRequestStatusColor = (status) => {
  switch (status) {
    case -1:
      return 'red'
    case 0:
      return 'default'
    case 1:
      return 'processing'
    case 2:
      return 'green'
    default:
      break
  }
}

export const checkRequestStatusColorText = (status) => {
  switch (status) {
    case -1:
      return 'red'
    case 0:
      return 'black'
    case 1:
      return '#1890ff'
    case 2:
      return 'green'
    default:
      break
  }
}
