'use client'
import React, { useState } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'

const ConfettiComponent = ({ isRunning }) => {
  const handleConfettiInit = (instance) => {
    instance.conductor.shoot()
    // Do something when confetti animation starts
  }

  return (
    <div className='z-10'>
      {isRunning && (
        <Realistic
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: '100%',
            height: ' 100%',
            top: '0px',
            left: '0px',
            zIndex: 10
          }}
          onInit={handleConfettiInit}
        />
      )}
    </div>
  )
}

export default ConfettiComponent
