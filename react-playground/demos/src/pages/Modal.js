import React, { useState } from 'react'

function Modal (props) {
  if (!props.visible) {
    return null
  }
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <header>modal</header>
        </div>
        <div className="model__body">
          body
        </div>
        <div className="footer">
          <button onClick={props.onClose}>取消</button>
          <button onClick={props.onClose}>确认</button>
        </div>
      </div>
    </div>
  )
}

function useModal () {
  const [isOpen, setIsOpen] = useState(() => {
    console.log('only run on initial render')
    return false
  })
  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return [isOpen, handleOpenModal, handleClose]
}

function ModalPage () {
  const [isOpen, onOpen, onClose] = useModal()
  return (
    <div className="app">
      <div>
        <button onClick={onOpen}>open</button>
      </div>
      <div>
        <button onClick={onClose}>close</button>
      </div>
      <Modal visible={isOpen} onOpen={onOpen} onClose={onClose}/>
    </div>
  )
}

export default ModalPage
