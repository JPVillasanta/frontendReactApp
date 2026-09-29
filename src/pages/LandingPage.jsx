import { Link } from 'react-router-dom'

/**
 * The home page introduces the starter and links to its working CRUD example.
 */
function LandingPage() {
  return (
    <main className="container">
      <section className="landing-hero">
        <p className="eyebrow">Welcome</p>
        <h2>Your React + Laravel starter is ready</h2>
        <p>
          Use the Products page to try the create, read, update, and delete
          actions powered by the Laravel API.
        </p>
        <Link className="primary-link" to="/product">Open Product Manager</Link>
      </section>

      <section className="card">
        <h2>How the app is organized</h2>
        <ul>
          <li><code>main.jsx</code> starts React.</li>
          <li><code>App.jsx</code> provides the shared layout and routes.</li>
          <li><code>pages/</code> contains screens for each route.</li>
          <li><code>components/</code> contains reusable interface pieces.</li>
        </ul>
      </section>
    </main>
  )
}

export default LandingPage
