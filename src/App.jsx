import LandingPage from "./components/LandingPage"
import './index.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </div>
  )
}

export default App
