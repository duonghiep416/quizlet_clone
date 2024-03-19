import Button from '../Button'
import TermCard from './TermCard'

const TermCardContainer = ({ cards, setCards, setNewData }) => {
  return (
    <>
      <div className='flex flex-col gap-5 mt-11'>
        {cards.map((card) => (
          <TermCard
            card={{
              terminology: card.front_content,
              definition: card.back_content,
              id: card.id
            }}
            setCards={setCards}
            setNewData={setNewData}
            key={card.id}
          />
        ))}
      </div>
      <Button
        type='button'
        btnType='secondary'
        content='Thêm hoặc xóa thuật ngữ'
        style={{
          fontSize: '18px',
          padding: '15px',
          margin: '30px auto'
        }}
      />
    </>
  )
}

export default TermCardContainer
