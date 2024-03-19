'use client'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useState } from 'react'

const RequiredPasswordModal = ({ setCards, setNewData, id }) => {
  const accessToken = Cookies.get('accessToken')
  const { onOpenChange } = useDisclosure()
  const [password, setPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState({
    isInvalid: false,
    message: ''
  })
  const handleSubmitPassword = async (type, password) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/check-password/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ type, password })
        }
      ).then((res) => res.json())
      if (response.status === 200) {
        const flashcards = response.data.flashcards.sort(
          (a, b) => a.order - b.order
        )
        response.flashcards = flashcards
        const fronts = flashcards.map((card) => card.front_content)
        const backs = flashcards.map((card) => card.back_content)
        const ids = flashcards.map((card) => card.id)
        setCards({
          fronts,
          backs,
          ids
        })
        setNewData(response)
      } else {
        setPasswordStatus({ isInvalid: true, message: response.message })
      }
    } catch (error) {
      console.error('Error confirming password:', error)
    }
  }
  return (
    <>
      <Modal
        isOpen={true}
        onOpenChange={onOpenChange}
        backdrop='blur'
        placement='top-center'
        classNames={{
          base: 'bg-slate-800'
        }}
      >
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmitPassword('course', password)
          }}
        >
          <ModalContent>
            <ModalHeader className='flex flex-col gap-1'>
              Nhập mật khẩu để truy cập nội dung này
            </ModalHeader>
            <ModalBody>
              <Input
                label='Password'
                type='password'
                variant='bordered'
                isInvalid={passwordStatus.isInvalid}
                errorMessage={passwordStatus.message}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='off'
              />
              <div className='flex py-2 px-1 justify-between'>
                <Link color='secondary' href='#' size='sm'>
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className='bg-secondary' type='submit'>
                Truy cập
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default RequiredPasswordModal
