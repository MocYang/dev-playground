import React from 'react'
import Link from 'gatsby-link'

const NavLink = (props) => (
  <li style={{display: 'block', marginRight: '1rme'}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <ul style={{float: 'right'}}>
        <NavLink to='/'>home</NavLink>
        <NavLink to='/page-2'>page-2</NavLink>
        <NavLink to='/page-3'>page-3</NavLink>
        <NavLink to='/md-one'>page-3</NavLink>
      </ul>
    </div>
  </div>
)

export default Header
