import { typeStatusRequest } from '../index'

export const disableField = (status) => {
  return (
    status === typeStatusRequest.CONFIRMED ||
    status === typeStatusRequest.APPROVED
  )
}

export const disableFieldWhenChoose = (value) => {
  return !!value
}
