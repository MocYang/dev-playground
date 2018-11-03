import React  from 'react'
import {Link} from 'react-router-dom'
const Index = () => (
  <div className={'page page-index'}>
    <h1> index pages</h1>
    <ul>
      <li><Link to={'/hooks'}> hooks</Link></li>
      <li>hooks with redux</li>
      <li><Link to={'/carousel'}>carousel</Link></li>
      <li><Link to={'/normal-class'}> normal-class</Link></li>
      <li><Link to={'/render-props'}> render-props</Link></li>
      <li><Link to={'/context'}>new context api</Link></li>
    </ul>
  </div>
)

export default Index
