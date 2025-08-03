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
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import { PrivateRoute, AdminRoute } from './RouterControll.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  let subtotal = cartItems.reduce((sum, [product, quantity]) => {
    const price = (product.discount > 0 ? (product.price - (product.price / product.discount)) : product.price).toFixed(0);
    return sum + (price * quantity);
  }, 0);
  const tax = subtotal * 0.25;
  subtotal = subtotal - tax;
  const total = subtotal + tax;

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

  const clearCart = () => {
    setCartItems(() => []);
  }

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
        {/* Public routes */}
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route element={<PrivateRoute isAllowed={!!user}/>}>
          <Route path="/" element={<Home />}/>        
          <Route path="/profile" element={<Profile userData={user} />}/>
          <Route path="/product" element={<Product addToCart={addToCart}/>} />
          <Route path="/products" element={<ProductList />}/>
          <Route path="/cart" element={<Cart cartCount={cartCount} cartItems={cartItems} updateQuantity={updateQuantity} clearCart={clearCart} removeItem={removeItem} subtotal={subtotal} tax={tax} total={total} />} />
          <Route path="/checkout" element={<Checkout user={user} cartCount={cartCount} cartItems={cartItems} subtotal={subtotal} tax={tax} total={total} clearCart={clearCart} />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />}/>
        </Route>
        

        {/* Admin routes */}
        <Route element={<AdminRoute isAdmin={user?.role == "admin"}/>}>
          <Route path="/admin" element={<h1>Admin page!</h1>} />
          <Route path="/admin/page" element={<h1>Admin Page-page!</h1>} />
        </Route>
        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
