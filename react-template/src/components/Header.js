import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className={'app__header'}>
    <Link to={'/'}>home</Link>
  </header>
)

export default Header
