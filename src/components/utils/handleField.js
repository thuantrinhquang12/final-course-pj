<<<<<<< HEAD
import { statusRequest } from '../index'

export const disableField = (status) => {
  return status === statusRequest.CONFIRMED || status === statusRequest.APPROVED
    ? true
    : false
}
=======
import { typeStatusRequest } from '../index'

export const disableField = (status) => {
  return status === typeStatusRequest.CONFIRMED ||
    status === typeStatusRequest.APPROVED
    ? true
    : false
}

export const disableFieldWhenChoose = (value) => {
  return value ? true : false
}
>>>>>>> b4095e29d9551734ea081ca64b357726bcf55e80
