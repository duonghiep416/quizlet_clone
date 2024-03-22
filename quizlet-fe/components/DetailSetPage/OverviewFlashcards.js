import Image from 'next/image'
import StudyMode from './StudyMode'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Button from '../Button'

const OverviewFlashcard = (props) => {
  const { numberOfFlashcards, setId } = props
  if (!numberOfFlashcards)
    return (
      <div>
        <p className='text-2xl text-gray-500'>
          Bạn chưa tạo bất kỳ thẻ ghi nhớ nào trong học phần
        </p>
        <Link href={`/detail/sets/edit?id=${setId}`}>
          <Button
            btnType='transparent'
            content='Bắt đầu tạo thẻ ghi nhớ ngay bây giờ!'
            style={{
              margin: '20px auto',
              border: '2px solid #fff'
            }}
          />
        </Link>
      </div>
    )
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
