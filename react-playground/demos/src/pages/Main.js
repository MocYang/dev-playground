import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/app.css'

const Main = () => {
  return (
    <div className="page page-main">
      <Link to={'/'} className={'nav'}>#</Link>
      <Link to={'/pure_component'} className={'nav'}>React.PureComponents</Link>
      <Link to={'/memo'} className={'nav'}>React.memo</Link>
      <Link to={'/forward_ref'} className={'forward_ref'}>React.forwardRef</Link>
      <Link to={'/lazy_suspense'} className={'lazy_suspense'}>React.lazy</Link>
      {/*<Link to={'/lazyload_js'} className={'nav'}>lazyload.js</Link>*/}
      {/*<Link to={'/circle-animate'} className={'nav'}>护眼动画</Link>*/}
    </div>
  )
}

export default Main
