import React, { useRef, useState, useEffect, useLayoutEffect, useMutationEffect } from 'react'
import '../assets/styles/carousel.scss'

import Slider from '../components/Slider'
import Indicators from '../components/Indicators'
import Indicator from '../components/Indicator'
import ProgressBar from '../components/ProgressBar'

const sliders = [
  {
    id: 1,
    title: 'slider 1'
  },
  {
    id: 2,
    title: 'slider 2'
  },
  {
    id: 3,
    title: 'slider 3'
  },
  {
    id: 4,
    title: 'slider 4'
  }
]

let progressTimestamp = null
let autoplayTimer = null
let progressTimer = null

const Carousel = (props) => {
  const carousel = useRef(null)
  const [activeSlider, setActiveSlider] = useState(0)
  const [progress, setProgress] = useState(0)
  const [play, setPlay] = useState(props.autoplay)

  const startProgressTicker = (timestamp) => {
    if (!progressTimestamp && timestamp) {
      progressTimestamp = timestamp
    }
    const progressMax = 100
    const progressMin = 0
    const timeRemain = props.interval
    const timePass = timestamp - progressTimestamp
    setProgress(Math.floor((progressMax - progressMin) * (timePass) / timeRemain))
    progressTimer = window.requestAnimationFrame(startProgressTicker)
  }

  const cancelProgressTicker = (id) => {
    window.cancelAnimationFrame(id)
    setProgress(0)
    progressTimestamp = null
  }

  const setAutoplay = () => setInterval(() => {
    setActiveSlider((preActive) => {
      let nextActive = preActive

      if (nextActive === sliders.length - 1) {
        nextActive = 0
      } else {
        nextActive++
      }
      return nextActive
    })
  }, props.interval)

  // 计算carousel-wrapper的宽, 只在组件挂载/卸载各执行一次
  useLayoutEffect(() => {
    carousel.current.style.width = window.innerWidth * sliders.length + 'px'
  }, [])

  // 每次activeSlider有变化之后，设置容器的偏移量
  useEffect(() => {
    const transformX = window.innerWidth * activeSlider + 'px'
    carousel.current.style.transform = `translateX(-${transformX})`

    return () => {
      progressTimestamp = null
      console.log('before next activeSlider change')
      console.log('play status in activeSlider change: ', play)
    }
  }, [activeSlider])

  // 切换自动轮播
  useMutationEffect(() => {
    console.log('play status: ', play)
    if (play) {
      autoplayTimer = setAutoplay()
      progressTimer = window.requestAnimationFrame(startProgressTicker)
    }

    return () => {
      console.log('clean up timers.')
      clearInterval(autoplayTimer)
      cancelProgressTicker(progressTimer)
    }
  }, [play])

  const gotoPrev = () => {
    console.log('activeSlider before render: ', activeSlider)
    if (activeSlider === 0) {
      setActiveSlider(0)
    } else {
      setActiveSlider(activeSlider - 1)
    }
  }

  const gotoNext = () => {
    console.log('activeSlider before render: ', activeSlider)
    if (activeSlider === sliders.length - 1) {
      setActiveSlider(sliders.length - 1)
    } else {
      setActiveSlider(activeSlider + 1)
    }
  }

  return (
    <div className="carousel">
      <div ref={carousel} className="slider-container">
        {sliders.map(slider => (
          <Slider key={slider.id} {...slider} />
        ))
        }
      </div>

      <Indicators render={() => (
        sliders.map((slider, index) => (
          <Indicator
            key={slider.id}
            active={activeSlider === index}
            onClick={() => setActiveSlider(index)}
          />
        ))
      )}>
      </Indicators>

      <div className="btn__arrow btn__prev" onClick={gotoPrev} />
      <div className="btn__arrow btn__next" onClick={gotoNext} />
      <div className={`btn__play ${!play ? 'play' : ''}`} onClick={() => setPlay(!play)} />

      <ProgressBar progress={progress} />
    </div>
  )
}

Carousel.defaultProps = {
  autoplay: false,
  interval: 3000
}

export default Carousel
