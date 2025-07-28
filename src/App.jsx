import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Home from './pages/Index.jsx'
import Product from './pages/Product.jsx';
import '/src/App.css'

function App() {
  const [cartCount, setCartCount] = useState(0)

  function addToCart(){
    setCartCount(prevCount => prevCount +1);
  }

  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product addToCart={addToCart}/>} />
      </Routes>
    </Router>
  )
}

export default App
