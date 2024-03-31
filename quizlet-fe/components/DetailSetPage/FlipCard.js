'use client'
import React from 'react'
import ReactCardFlip from 'react-card-flip'

const FlipCard = ({
  frontContent,
  backContent,
  setIsFlipped,
  isFlipped,
  customChild
}) => {
  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection='vertical'
      flipSpeedBackToFront={0.4}
      flipSpeedFrontToBack={0.4}
      containerStyle={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      cardStyles={{
        front: {
          backgroundColor: '#2e3856',
          width: '100%',
          height: '100%',
          border: '2px solid #fff',
          borderRadius: '10px',
          cursor: 'pointer'
        },
        back: {
          backgroundColor: '#2e3856',
          width: '100%',
          height: '100%',
          border: '2px solid #fff',
          borderRadius: '10px',
          cursor: 'pointer'
        }
      }}
    >
      <div
        onClick={handleClick}
        className='w-full h-full p-10 text-justify flex items-center justify-center select-none'
      >
        {frontContent}
        {customChild && customChild}
      </div>
      <div
        onClick={handleClick}
        className='w-full h-full p-10 text-justify flex items-center justify-center select-none'
      >
        {backContent}
      </div>
    </ReactCardFlip>
  )
}

export default FlipCard
