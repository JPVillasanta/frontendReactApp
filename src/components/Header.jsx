/**
 * Shared top header shown above the page navigation.
 */
function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">React + Laravel starter</p>
        <h1>My Application</h1>
        <p className="header-subtitle">A simple frontend connected to a Laravel API.</p>
      </div>
    </header>
  )
}

export default Header
