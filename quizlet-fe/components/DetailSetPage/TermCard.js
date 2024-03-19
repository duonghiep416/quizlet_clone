import { StarIcon } from '@heroicons/react/24/outline'
import ActionIcon from './ActionIcon'
import EditFlashCardModal from './EditFlashcardModal'

const TermCard = ({ card, setCards, setNewData }) => {
  return (
    <div>
      <div className='term-card p-4 bg-gray-main rounded-sm'>
        <div className='term-card-content flex w-full gap-5'>
          <p className='term min-w-1/4 w-1/4 text-lg'>{card?.terminology}</p>
          <div className='separator w-[2px] bg-slate-950'></div>
          <p className='definition grow text-lg'>{card?.definition}</p>
          <div className='action flex gap-1'>
            <ActionIcon
              type='active'
              tooltip='Gắn sao'
              IconComponent={StarIcon}
              iconStyle={{ width: '24px', height: '24px' }}
              isActive={false}
              styleContainer={{
                width: '40px',
                height: '40px'
              }}
            />
            <EditFlashCardModal
              card={card}
              setCards={setCards}
              setNewData={setNewData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermCard
