import { TrashIcon } from '@heroicons/react/24/outline'
import ActionIcon from '../DetailSetPage/ActionIcon'
import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from './ReorderIcon'
import { useRaisedShadow } from './use-raised-shadow'
import { Textarea } from '@nextui-org/react'
import { useState } from 'react'

const FormSetFlashcard = ({ item, index, setFlashcards }) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const dragControls = useDragControls()
  const [flashcard, setFlashcard] = useState(item)
  const handleDelete = () => {
    setFlashcards((prev) => prev.filter((_, i) => i !== index))
  }
  return (
    <Reorder.Item
      value={item}
      id={index}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className='bg-gray-main flex flex-col px-5 py-4 rounded-xl overflow-hidden select-none'
    >
      <header className='flex justify-between items-center border-b-2 border-slate-950 pb-2 mb-3'>
        <span className='select-none'>{index + 1}</span>
        <div className='action flex items-center'>
          <ReorderIcon dragControls={dragControls} />
          <ActionIcon
            tooltip='Xóa thẻ này'
            IconComponent={TrashIcon}
            onClick={handleDelete}
          />
        </div>
      </header>
      <div className='w-full flex gap-10'>
        <div className='flex flex-col grow '>
          <Textarea
            id='terminology'
            defaultValue={item.front_content}
            onChange={(e) => {
              if (e.target.value.length < 101) {
                setFlashcard((prev) => ({
                  ...prev,
                  front_content: e.target.value
                }))
              }
            }}
            value={flashcard.front_content}
            variant='underlined'
            key='underlined'
            height='fit-content'
            size='lg'
            isRequired
            minRows={1}
            className='terminology col-span-12 md:col-span-6 mb-6 md:mb-0'
            isInvalid={
              flashcard.front_content.length === 0 ||
              flashcard.front_content.length >= 100
            }
            errorMessage={
              (flashcard.front_content.length === 0 ||
                flashcard.front_content.length >= 100) &&
              'Thuật ngữ không được để trống và không được quá 100 ký tự'
            }
          />
          <label htmlFor='terminology' className='text-sm mt-1 text-slate-300'>
            Thuật ngữ
          </label>
        </div>
        <div className='flex flex-col grow '>
          <Textarea
            id='definition'
            defaultValue={item.back_content}
            variant='underlined'
            key='underlined'
            height='fit-content'
            value={flashcard.back_content}
            onChange={(e) => {
              if (e.target.value.length < 256) {
                setFlashcard((prev) => ({
                  ...prev,
                  back_content: e.target.value
                }))
              }
            }}
            size='lg'
            isRequired
            isInvalid={
              flashcard.back_content.length === 0 ||
              flashcard.back_content.length >= 255
            }
            errorMessage={
              (flashcard.back_content.length === 0 ||
                flashcard.back_content.length >= 255) &&
              'Định nghĩa không được để trống và không được quá 255 ký tự'
            }
            minRows={1}
            className='definition col-span-12 md:col-span-6 mb-6 md:mb-0'
          />
          <label htmlFor='definition' className='text-sm mt-1 text-slate-300'>
            Định nghĩa
          </label>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default FormSetFlashcard
