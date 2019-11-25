import React, { useState, useEffect } from 'react'
import '../assets/styles/circle-animate.css'
const win = window
const RADIO = 100
const halfRadio = RADIO / 2
const quadrantMap = {
  1: {
    x: 1,
    y: -1
  },
  2: {
    x: 1,
    y: 1
  },
  3: {
    x: -1,
    y: 1
  },
  4: {
    x: -1,
    y: -1
  }
}
const FULL_ANGLE = 360

const getQuadrant = angle => {
  let quadrant = 1

  if (angle >= 90 && angle < 180) {
    quadrant = 2
  } else if (angle >= 180 && angle < 270) {
    quadrant = 3
  } else if (angle >= 270 && angle < 360) {
    quadrant = 4
  }

  return quadrant
}
// 角度转弧度
const getRadian = angle => (angle / 180) * Math.PI

/**
 * 求当前点与中心点的距离。
 *  只有30，90，150，210，270， 330度方向的点与中心点的距离为整数倍
 * @param {number} i
 * @param {number} angle
 */
const getDistance = (i, angle, initAngle) => {
  if (
    angle === 30 ||
    angle === 90 ||
    angle === 150 ||
    angle === 210 ||
    angle === 270 ||
    angle === 330
  ) {
    return i * RADIO
  }

  return i * RADIO
}

const CircleAnimate = () => {
  const [circleGroup, setCircleGroup] = useState([])

  // 初始化画板
  useEffect(() => {
    const ww = win.innerWidth
    const wh = win.innerHeight

    const centerPointSize = {
      width: parseInt(ww / 2),
      height: parseInt(wh / 2),
      radio: RADIO
    }

    // create center point
    const centerPoint = {
      left: centerPointSize.width - halfRadio,
      top: centerPointSize.height - halfRadio,
      id: 0
    }

    const pointGroup = []
    // create other point
    // 最多围绕中心点循环次数
    // let maxIndex = Math.ceil(((ww / 2) - halfRadio) / RADIO)
    let maxIndex = 3

    // 多渲染两圈
    // maxIndex += 2

    for (let i = 1; i <= maxIndex; ++i) {
      let circleNumber = i * 6
      // 奇数圈和偶数圈的初始角度不同
      let isOdd = i % 2 === 1
      let intAngle = isOdd ? FULL_ANGLE / circleNumber / 2 : 0
      for (let j = 0; j < circleNumber; ++j) {
        const pointCenterAngle = intAngle + j * (FULL_ANGLE / circleNumber)
        const distanceBetweenCenterPoint = getDistance(
          i,
          pointCenterAngle,
          intAngle
        )
        const pointQuadrant = getQuadrant(pointCenterAngle)
        const quadrantRadio = quadrantMap[pointQuadrant]
        let newPoint = {
          left: centerPoint.left + i * RADIO * Math.abs(Math.sin(getRadian(pointCenterAngle))) * quadrantRadio.x,
          top: centerPoint.top + i * RADIO * Math.abs(Math.cos(getRadian(pointCenterAngle))) * quadrantRadio.y
        }
        newPoint['id'] = j + 1
        pointGroup.push(newPoint)
      }
    }
    setCircleGroup([centerPoint, ...pointGroup])
  }, [])

  return (
    <div className='stage'>
      {circleGroup.map((c, i) => (
        <div
          key={i}
          className='circle'
          style={{
            top: c.top,
            left: c.left,
            width: RADIO + 'px',
            height: RADIO + 'px',
            lineHeight: RADIO + 'px'
          }}
        >
          {c.id}
        </div>
      ))}
    </div>
  )
}

export default CircleAnimate
