'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './CarouselArrowButton'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './CarouselSelectedSnapDisplay'
import FlipCard from './FlipCard'
import ConfettiComponent from './ConfettiComponent'
import { PencilIcon } from '@heroicons/react/24/solid'
import OverviewFlashcard from './OverviewFlashcards'
import ActionIcon from './ActionIcon'
const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const EmblaCarousel = (props) => {
  const { slides, options, backs } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const tweenFactor = useRef(0)
  const tweenNodes = useRef([])
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  //Shoot confetti
  const handleFireConfetti = () => {
    setTimeout(() => {
      setIsRunning(true)
    }, 400)
    setTimeout(() => {
      setIsRunning(false)
    }, 5000)
  }
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  const onScroll = useCallback((emblaApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])
  useEffect(() => {
    if (!emblaApi) return
    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])
  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number')
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `scale(${scale})`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className='embla relative'>
      <ConfettiComponent isRunning={isRunning} />
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {[...slides, ''].map((content, index) => (
            <div className='embla__slide card__flip_container' key={index}>
              {/* Nội dung */}
              <div className='embla__slide__number card__flip_content relative'>
                <div className='action-container absolute z-10 right-3 top-3'>
                  <ActionIcon type='edit' tooltip='Sửa' />
                </div>
                <FlipCard
                  frontContent={content}
                  backContent={backs[index] || ''}
                  isFlipped={isFlipped}
                  setIsFlipped={() => {
                    if (index !== slides.length) setIsFlipped(!isFlipped)
                  }}
                  customChild={
                    index === slides.length ? (
                      <OverviewFlashcard numberOfFlashcards={slides.length} />
                    ) : null
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <SelectedSnapDisplay
            selectedSnap={selectedSnap}
            snapCount={snapCount}
          />
          <NextButton
            onClick={() => {
              if (selectedSnap === slides.length - 1) handleFireConfetti()
              onNextButtonClick()
            }}
            disabled={nextBtnDisabled}
          />
        </div>

        <div className='embla__progress'>
          <div
            className='embla__progress__bar'
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
