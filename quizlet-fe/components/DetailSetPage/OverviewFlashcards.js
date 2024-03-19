import Image from 'next/image'
import StudyMode from './StudyMode'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OverviewFlashcard = (props) => {
  const { numberOfFlashcards } = props
  return (
    <div className='w-full h-full p-6 cursor-auto'>
      <div className='heading flex items-center gap-3'>
        <p className='text-3xl font-bold leading-snug'>
          Chúc mừng! Bạn đã hoàn thành toàn bộ thẻ ghi nhớ
        </p>
        <Image
          src='/icon/detailPage/permafetti.svg'
          alt='overview-flashcard'
          width={200}
          height={200}
        />
      </div>
      <div className='text-gray-500 text-sm'>
        <p className='font-semibold text-2xl py-5'>Bước tiếp theo</p>
        <div className='study-mode flex gap-4 justify-between'>
          <StudyMode
            contentStart={
              <Image
                src='/icon/detailPage/study-icon.svg'
                width={64}
                height={64}
                className='min-w-[64px]'
                alt='study icon'
              />
            }
            title='Học các thuật ngữ này'
            description={`Trả lời các câu hỏi về ${numberOfFlashcards} thuật ngữ này để xây dựng kiến thức`}
            type='large'
            contentEnd={<ChevronRightIcon className='h-3 w-3' />}
          />
          <StudyMode
            contentStart={
              <Image
                src='/icon/detailPage/flashcards-icon.svg'
                width={64}
                height={64}
                className='min-w-[64px]'
                alt='study icon'
              />
            }
            title='Đặt lại thẻ ghi nhớ'
            description={`Học lại tất cả ${numberOfFlashcards} thuật ngữ từ đầu`}
            type='large'
            contentEnd={<ChevronRightIcon className='h-3 w-3' />}
          />
        </div>
      </div>
    </div>
  )
}

export default OverviewFlashcard
