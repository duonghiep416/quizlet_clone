'use client'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import FormSetData from '@/components/EditSetPage/FormSetData'
import FormSetFlashcard from '@/components/EditSetPage/FormSetFlashcard'
import { Reorder } from 'framer-motion'
import Button from '@/components/Button'
import { v4 as uuidv4 } from 'uuid'
import { set } from 'date-fns'
const EditSetPage = ({ params }) => {
  const accessToken = Cookies.get('accessToken')
  const { id, action } = params
  if (action !== 'edit' && action !== 'add') {
    return notFound()
  }
  const [flashcards, setFlashcards] = useState(null)
  const [defaultMetadata, setDefaultMetadata] = useState({
    title: '',
    description: ''
  })
  const [statusUpdateData, setStatusUpdateData] = useState(false)
  const { data } = useQuery({
    queryKey: ['set'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/courses/${id}`,
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
        setFlashcards(response.flashcards)
        setDefaultMetadata({
          title: response.data.name,
          description: response.data.description || ''
        })
      }
      return response
    },
    refetchOnWindowFocus: false
  })
  const updateMetadata = (metadata) => {
    setDefaultMetadata(metadata)
  }
  useEffect(() => {
    const patchData = async (dataUpdate) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/courses/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(dataUpdate)
        }
      ).then((res) => res.json())
      console.log(response)
    }
    if (defaultMetadata?.isUpdate) {
      const dataUpdate = collectDataEdit()
      let isInvalid = false
      dataUpdate.flashcards.forEach((item) => {
        if (
          !item.front_content ||
          item.front_content.length >= 100 ||
          !item.back_content ||
          item.back_content.length >= 255
        ) {
          isInvalid = true
        }
      })
      if (!dataUpdate.name || dataUpdate.name.length >= 100) {
        isInvalid = true
      }
      if (isInvalid) {
        return setStatusUpdateData(false)
      }
      console.log(dataUpdate)
      patchData(dataUpdate)
    }
  }, [defaultMetadata])
  const collectDataEdit = () => {
    const terminologies = document.querySelectorAll('.terminology textarea')
    const definitions = document.querySelectorAll('.definition')
    const ids = flashcards.map((item) => {
      if (item.isNew) {
        return null
      }
      return item.id
    })
    const newFlashcards = []
    terminologies.forEach((item, index) => {
      newFlashcards.push({
        front_content: item.value,
        back_content: definitions[index].querySelector('textarea').value,
        id: ids[index]
      })
    })
    return {
      name: defaultMetadata.title,
      description: defaultMetadata.description,
      flashcards: newFlashcards
    }
  }
  return (
    <>
      {flashcards && (
        <div>
          <FormSetData
            defaultMetadata={defaultMetadata}
            updateMetadata={statusUpdateData ? updateMetadata : null}
            setStatusUpdateData={setStatusUpdateData}
          />
          <Reorder.Group
            axis='y'
            onReorder={setFlashcards}
            values={flashcards}
            className='flex flex-col gap-5 mt-10'
          >
            {flashcards.map((item, index) => (
              <FormSetFlashcard
                key={item.id}
                item={item}
                index={index}
                setFlashcards={setFlashcards}
              />
            ))}
          </Reorder.Group>
          <Button
            content='+ Thêm thuật ngữ'
            btnType='transparent'
            style={{
              fontSize: '18px',
              padding: '15px',
              margin: '30px auto',
              border: '2px solid #fff'
            }}
            onClick={() => {
              setFlashcards((prev) => [
                ...prev,
                {
                  id: uuidv4(),
                  front_content: '',
                  back_content: '',
                  isNew: true
                }
              ])
            }}
          />
          <Button
            content='Lưu thay đổi'
            btnType='secondary'
            style={{
              fontSize: '18px',
              padding: '15px',
              margin: '30px 0 30px auto'
            }}
            onClick={() => {
              setStatusUpdateData(true)
            }}
          />
        </div>
      )}
    </>
  )
}

export default EditSetPage
