import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Nav from './components/Nav.jsx'
import SideBar from './components/SideBar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProductPage from './pages/ProductPage.jsx'

/**
 * App is the top-level layout and route table for the frontend.
 * Keep shared parts here so they appear on every page.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Nav />

        <div className="app-body">
          <SideBar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="*" element={<main className="container"><h1>Page not found</h1><p>Choose Home or Products from the navigation.</p></main>} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
