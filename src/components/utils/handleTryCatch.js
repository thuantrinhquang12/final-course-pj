import { typePopup } from '../index'

export const handleTryCatch = async (value, message, closeModal) => {
  try {
    const data = await value
    if (data.payload?.status) {
      typePopup.popupNotice(typePopup.SUCCESS_MESSAGE, 'Message', message, 1)
      closeModal()
    } else if (data?.error?.message.includes('423')) {
      const message = 'You have run out of requests for this month'
      throw message
    } else {
      throw data.payload
    }
  } catch (error) {
    typePopup.popupNotice(
      typePopup.ERROR_MESSAGE,
      'Message',
      error || 'An error occurred',
      1,
    )
  }
}
