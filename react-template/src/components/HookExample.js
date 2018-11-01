import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const HookFunc = (props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `you click counter ${count} time`
  })

  const {
    title
  } = props
  return (
    <section>
      <h2>{title}</h2>
      <p>you click {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        count add
      </button>
    </section>
  )
}

HookFunc.propTypes = {
  title: PropTypes.string
}

HookFunc.defaultProps = {
  title: 'default HookFunc example'
}

export default HookFunc
