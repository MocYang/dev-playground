import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import '../assets/styles/carousel.scss'

import Slider from '../components/Slider'
import Indicators from '../components/Indicators'
import Indicator from '../components/Indicator'

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


const Carousel = (props) => {
  const carousel = useRef(null)
  const [activeSlider, setActiveSlider] = useState(0)

  const [play, setPlay] = useState(props.autoplay)

  let autoplayTimer = null

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
    console.log('Carousel mounted')
    carousel.current.style.width = window.innerWidth * sliders.length + 'px'
  }, [])

  // 每次activeSlider有变化之后，设置容器的偏移量
  useEffect(() => {
    console.log('activeSlider after render: ', activeSlider)
    const transformX = window.innerWidth * activeSlider + 'px'
    carousel.current.style.transform = `translateX(-${transformX})`
  }, [activeSlider])

  // 切换自动轮播
  useEffect(() => {
    console.log('play status: ', play)
    if (play) {
      autoplayTimer = setAutoplay()
    }

    return () => {
      clearInterval(autoplayTimer)
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
        sliders.map((slider ,index) => (
          <Indicator
            key={slider.id}
            active={activeSlider === index}
            onClick={() => setActiveSlider(index)}
          />
        ))
      )}>
      </Indicators>

      <div className="btn__arrow btn__prev" onClick={gotoPrev} />
      <div className="btn__arrow btn__next" onClick={gotoNext}/>
      <div className={`btn__play ${!play ? 'play' : ''}`} onClick={() => setPlay(!play)}/>
    </div>
  )
}

Carousel.defaultProps = {
  autoplay: false,
  interval: 5000
}

export default Carousel
