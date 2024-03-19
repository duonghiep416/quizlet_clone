import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Switch,
  cn
} from '@nextui-org/react'
import ActionIcon from './ActionIcon'
import { useState } from 'react'
import Cookies from 'js-cookie'
const EditFlashCardModal = ({ card, setCards, setNewData }) => {
  const accessToken = Cookies.get('accessToken')
  const { terminology, definition, id } = card
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState({
    terminology,
    definition
  })
  const handleChangeValue = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleSaveFlashcard = async () => {
    if (data.terminology === terminology && data.definition === definition) {
      return
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/flashcards/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          front_content: data.terminology,
          back_content: data.definition
        })
      }
    ).then((res) => res.json())
    if (response.status === 200) {
      const card = response.data
      setCards((prev) => {
        const index = prev.ids.indexOf(id)
        const newFronts = [...prev.fronts]
        const newBacks = [...prev.backs]
        newFronts[index] = card.front_content
        newBacks[index] = card.back_content
        return {
          fronts: newFronts,
          backs: newBacks,
          ids: prev.ids
        }
      })
      setNewData((prev) => {
        const flashcards = prev.data.flashcards.map((flashcard) => {
          if (flashcard.id === id) {
            flashcard.front_content = card.front_content
            flashcard.back_content = card.back_content
          }
          return flashcard
        })
        return {
          ...prev,
          data: {
            ...prev.data,
            flashcards
          }
        }
      })
    } else {
      console.error('Error updating flashcard:', response.message)
    }
  }
  return (
    <>
      <Button onPress={onOpen} className='bg-transparent min-w-0 p-0'>
        <ActionIcon type='edit' tooltip='Sửa' />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Sửa thẻ ghi nhớ
              </ModalHeader>
              <ModalBody className='flex flex-col gap-7'>
                <Input
                  label='Thuật ngữ'
                  defaultValue={terminology}
                  onChange={handleChangeValue}
                  name='terminology'
                />
                <Input
                  label='Định nghĩa'
                  defaultValue={definition}
                  name='definition'
                  onChange={handleChangeValue}
                />
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color='secondary'
                  variant='light'
                  onPress={() => {
                    handleSaveFlashcard()
                    onClose()
                  }}
                >
                  Lưu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditFlashCardModal
