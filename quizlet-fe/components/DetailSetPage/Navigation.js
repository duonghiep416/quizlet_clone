import Image from 'next/image'
import StudyMode from './StudyMode'

const Navigation = () => {
  return (
    <div className='flex justify-between gap-4 py-7'>
      <StudyMode
        contentStart={
          <Image
            src='/icon/detailPage/flashcards-icon.svg'
            width={32}
            height={32}
            className='min-w-[32px]'
            alt='flashcards icon'
          />
        }
        title='Thẻ ghi nhớ'
      />
      <StudyMode
        contentStart={
          <Image
            src='/icon/detailPage/study-icon.svg'
            width={32}
            height={32}
            className='min-w-[32px]'
            alt='study icon'
          />
        }
        title='Học'
      />
      <StudyMode
        contentStart={
          <Image
            src='/icon/detailPage/exam-icon.svg'
            width={32}
            height={32}
            className='min-w-[32px]'
            alt='exam icon'
          />
        }
        title='Kiểm tra'
      />
      <StudyMode
        contentStart={
          <Image
            src='/icon/detailPage/card-pairing.svg'
            width={32}
            height={32}
            className='min-w-[32px]'
            alt='card pairing icon'
          />
        }
        title='Ghép thẻ'
      />
    </div>
  )
}

export default Navigation
