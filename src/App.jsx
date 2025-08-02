import { useState, useEffect } from 'react'
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
import Cart from './pages/Cart.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(([p]) => p.id === product.id);

      if (existingIndex !== -1) {
        return prev.map(([p, q], i) =>
          i === existingIndex
            ? [p, Math.min(q + quantity, p.stock)]
            : [p, q]
        );
      }

      return [...prev, [product, Math.min(quantity, product.stock)]];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map(([p, q]) =>
        p.id === productId
          ? [p, Math.max(1, Math.min(newQuantity, p.stock))]
          : [p, q]
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter(([p]) => p.id !== productId));
  };

  function onLogout(){
    setUser(null);
  }

  /* if cart changes, auto-update cartcount for header */
  useEffect(() => {
    const count = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);
    setCartCount(count);
  }, [cartItems]);

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
        <Route path="/cart" element={<Cart cartCount={cartCount} cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem}/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
