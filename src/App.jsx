import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import Home from './pages/Index.jsx'
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import '/src/App.css'
import Register from './pages/Register.jsx';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  function addToCart(incValue){
    setCartCount(prevCount => prevCount + incValue);
  }

  function onLogout(){
    setUser(null);
  }

  return (
    <Router>
      <Header cartCount={cartCount} userData={user} onLogout={onLogout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile userData={user} />} />
        <Route path="/product" element={<Product addToCart={addToCart}/>} />
        <Route path="/products" element={<ProductList />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
