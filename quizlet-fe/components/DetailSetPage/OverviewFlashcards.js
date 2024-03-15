import Image from 'next/image'

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
        <p>Overview</p>
        <p>{numberOfFlashcards} flashcards</p>
      </div>
    </div>
  )
}

export default OverviewFlashcard
