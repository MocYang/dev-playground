import React, { useRef, useState, useLayoutEffect, useMutationEffect } from 'react'
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

let autoplayTimer = null

const setAutoplay = (cb, interval) => setInterval(() => {
  cb((preActive) => {
    let nextActive = preActive

    if (nextActive === sliders.length - 1) {
      nextActive = 0
    } else {
      nextActive++
    }
    return nextActive
  })
}, interval)

const Carousel = (props) => {
  const carousel = useRef(null)
  const [activeSlider, setActiveSlider] = useState(0)
  const [play, setPlay] = useState(props.autoplay)
  const [progressRun, setProgressRun] = useState(props.autoplay)
  const [progressReset, setProgressReset] = useState(null)

  // 计算carousel-wrapper的宽, 只在组件挂载/卸载各执行一次
  useLayoutEffect(() => {
    carousel.current.style.width = window.innerWidth * sliders.length + 'px'
  }, [])

  // 每次activeSlider有变化之后，设置容器的偏移量
  useLayoutEffect(() => {
    const transformX = window.innerWidth * activeSlider + 'px'
    carousel.current.style.transform = `translateX(-${transformX})`
  }, [activeSlider])

  // 切换自动轮播
  useMutationEffect(() => {
    if (play) {
      autoplayTimer = setAutoplay(setActiveSlider, props.interval)
      setProgressRun(true)
      setProgressReset(true)
    }

    return () => {
      clearInterval(autoplayTimer)
      setProgressRun(false)
    }
  }, [play, activeSlider])

  const toPrev = () => {
    if (activeSlider === 0) {
      setActiveSlider(0)
    } else {
      setActiveSlider(activeSlider - 1)
    }
  }

  const toNext = () => {
    if (activeSlider === sliders.length - 1) {
      setActiveSlider(sliders.length - 1)
    } else {
      setActiveSlider(activeSlider + 1)
    }
  }

  return (
    <div className="carousel">
      <div ref={carousel} className="slider-container">
        {
          sliders.map(slider => (
            <Slider key={slider.id} {...slider} />
          ))
        }
      </div>

      <Indicators>
        {() => (
          sliders.map((slider, index) => (
            <Indicator
              key={slider.id}
              active={activeSlider === index}
              onClick={() => setActiveSlider(index)}
            />
          ))
        )}
      </Indicators>

      <div className="btn__arrow btn__prev" onClick={toPrev} />
      <div className="btn__arrow btn__next" onClick={toNext} />
      <div className={`btn__play ${!play ? 'play' : ''}`} onClick={() => setPlay(!play)} />

      <ProgressBar
        interval={props.interval}
        run={progressRun}
        reset={progressReset}
      />
    </div>
  )
}

Carousel.defaultProps = {
  autoplay: false,
  interval: 3000
}

export default Carousel
