import { notification } from 'antd'
import 'antd/dist/antd.min.css'

export const ERROR_MESSAGE = 'error'
export const SUCCESS_MESSAGE = 'success'
export const SUCCESS_WARNING = 'warning'
export const SUCCESS_INFO = 'info'

const popupNotice = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  })
}

export default popupNotice
