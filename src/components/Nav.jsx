import { NavLink } from 'react-router-dom'

/**
 * Main page navigation. NavLink also marks the current page as active.
 */
function Nav() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/product">Products</NavLink>
    </nav>
  )
}

export default Nav
