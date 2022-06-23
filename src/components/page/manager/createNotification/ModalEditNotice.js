import React from 'react'
import Dialog from '../../../common/createModal/Modal'
import CreateNotification from './CreateNotification'
import PropTypes from 'prop-types'

const ModalEditNotice = (props) => {
  const { isOpen, handleModal, data } = props

  return (
    <div>
      <Dialog
        isOpen={isOpen}
        handleModal={handleModal}
        title="Create Notifications Draft"
      >
        <CreateNotification data={data} handleModal={handleModal} />
      </Dialog>
    </div>
  )
}

ModalEditNotice.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  data: PropTypes.object,
}

export default ModalEditNotice
