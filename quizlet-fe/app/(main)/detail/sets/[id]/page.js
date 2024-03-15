'use client'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Carousel from '@/components/DetailSetPage/Carousel'
import Head from 'next/head'
import HeadingPage from '@/components/DetailSetPage/HeadingPage'
const DetailSetPage = ({ params }) => {
  const accessToken = Cookies.get('accessToken')
  const { id } = params
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [passwordStatus, setPasswordStatus] = useState({
    isInvalid: false,
    message: ''
  })
  const [newData, setNewData] = useState(null)
  const [password, setPassword] = useState('')
  const [cards, setCards] = useState({})
  const { isPending, error, data } = useQuery({
    queryKey: ['set'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${'courses'}/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => res.json())
      if (response.status === 200) {
        const flashcards = response.data.flashcards.sort(
          (a, b) => a.order - b.order
        )
        response.flashcards = flashcards
        const fronts = flashcards.map((card) => card.front_content)
        const backs = flashcards.map((card) => card.back_content)
        setCards({
          fronts,
          backs
        })
        setNewData(response)
      }
      return response
    },
    refetchOnWindowFocus: false
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
        setCards({
          fronts,
          backs
        })
        setNewData(response)
      } else {
        setPasswordStatus({ isInvalid: true, message: response.message })
      }
    } catch (error) {
      console.error('Error confirming password:', error)
    }
  }
  useEffect(() => {
    if (newData)
      document.title = `Thẻ ghi nhớ: ${newData?.data?.name} | Quizlet`
  }, [newData])
  return (
    <div className='max-w-[61%]'>
      {newData && (
        <>
          <HeadingPage title={newData?.data.name} />
          <Carousel slides={cards?.fronts} backs={cards?.backs} />
        </>
      )}
      {data?.status === 404 && !newData && <p>Not found</p>}
      {data?.status === 401 && !newData && data?.isPassword && (
        <>
          <Modal
            isOpen={true}
            onOpenChange={onOpenChange}
            placement='top-center'
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
                />
                <div className='flex py-2 px-1 justify-between'>
                  <Link color='secondary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    handleSubmitPassword('course', password)
                  }}
                  className='bg-secondary'
                >
                  Truy cập
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  )
}

export default DetailSetPage
