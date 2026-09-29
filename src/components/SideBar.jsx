import { NavLink } from 'react-router-dom'

/**
 * Sidebar holds the starter's quick links and a short API reminder.
 */
function SideBar() {
  return (
    <aside className="sidebar">
      <h2>Quick links</h2>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/product">Manage products</NavLink>

      <div className="sidebar-note">
        <strong>API example</strong>
        <code>GET /api/products</code>
      </div>
    </aside>
  )
}

export default SideBar
