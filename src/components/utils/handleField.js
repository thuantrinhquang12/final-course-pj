import { statusRequest } from '../index'

export const disableField = (status) => {
  return status === statusRequest.CONFIRMED || status === statusRequest.APPROVED
    ? true
    : false
}

export const disableFieldWhenChoose = (value) => {
  return value ? true : false
}
