'use client'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { notFound, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FormSetData from '@/components/EditSetPage/FormSetData'
import FormSetFlashcard from '@/components/EditSetPage/FormSetFlashcard'
import { Reorder } from 'framer-motion'
import Button from '@/components/Button'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import ActionIcon from '@/components/DetailSetPage/ActionIcon'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
const EditSetPage = (request) => {
  const accessToken = Cookies.get('accessToken')
  const router = useRouter()
  const { params, searchParams } = request
  const { action } = params
  const id = searchParams.id
  if (action === 'edit' && !id) return notFound()
  if (action === 'add' && id) return notFound()
  if (action !== 'edit' && action !== 'add') {
    return notFound()
  }
  const [flashcards, setFlashcards] = useState(null)
  const [defaultMetadata, setDefaultMetadata] = useState({
    title: '',
    description: '',
    folderId: null
  })
  const [statusUpdateData, setStatusUpdateData] = useState(false)
  const { data } = useQuery({
    queryKey: ['set'],
    queryFn: async () => {
      if (action === 'edit' && id) {
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
            description: response.data.description || '',
            folderId: response.data.category_id || null
          })
        }
        return response
      } else {
        setDefaultMetadata({
          title: '',
          description: '',
          folderId: null
        })
        setFlashcards([])
        return {
          status: 200,
          data: {
            name: '',
            description: '',
            flashcards: []
          }
        }
      }
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
      return response
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
      toast.promise(patchData(dataUpdate), {
        loading: 'Đang cập nhật...',
        success: (data) => {
          if (data.status === 200) {
            router.push(`/detail/sets?id=${id}`)
            return 'Cập nhật thành công'
          }
        },
        error: 'Cập nhật thất bại'
      })
    }
  }, [defaultMetadata])
  const handleReorder = (newOrder) => {
    // Tạo một bản sao mới của mảng flashcards dựa trên thứ tự mới của id
    const reorderedFlashcards = newOrder.map((id) =>
      flashcards.find((flashcard) => flashcard.id === id)
    )
    // Cập nhật trạng thái của flashcards với mảng mới đã được sắp xếp
    setFlashcards(reorderedFlashcards)
  }
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
        id: ids[index],
        order: index + 1
      })
    })
    return {
      name: defaultMetadata.title,
      description: defaultMetadata.description,
      category_id:
        defaultMetadata.folderId === 0 ? null : defaultMetadata.folderId,
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
          <div className='action-group flex justify-end gap-3 my-10'>
            <ActionIcon
              IconComponent={Cog6ToothIcon}
              tooltip='Tùy chọn'
              styleContainer={{
                border: '2px solid #fff'
              }}
            />
            <ActionIcon
              IconComponent={ArrowsRightLeftIcon}
              tooltip='Lật thuật ngữ và định nghĩa'
              styleContainer={{
                border: '2px solid #fff'
              }}
              onClick={() => {
                const flashcardCollection = collectDataEdit().flashcards
                const newFlashcards = flashcardCollection.map((item) => ({
                  ...item,
                  front_content: item.back_content,
                  back_content: item.front_content
                }))
                setFlashcards(newFlashcards)
              }}
            />
          </div>
          <Reorder.Group
            axis='y'
            onReorder={handleReorder}
            values={flashcards.map((item) => item.id)}
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
