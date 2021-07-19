import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks" />
        </div>

        <Link to={'/'}>Home</Link>
        <Link to={'/posts'}>Posts</Link>
      </section>
    </nav>
  )
}

export default Navbar
