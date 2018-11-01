import React, { useState, useEffect } from 'react'

const AsyncInitStateHook = () => {
  const [name, setName] = useState(() => {
    const name = 'sync init name'
    console.log(name)
    return name
  })

  useEffect(() => {

  }, [])

  return (
    <section>
      <h2>async init state</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <p>{name}</p>
    </section>
  )
}

export default AsyncInitStateHook
