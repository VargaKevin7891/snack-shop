import { Button, Typography, } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import OrderSummary from '../components/OrderSummary';
import CheckoutForm from '../components/CheckoutFrom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout({ user, cartCount, cartItems, subtotal, tax, total, clearCart }) {
  const [shippingInfo, setShippingInfo] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zip_code: user?.zip_code || '',
  });
  
  function handleInputChange(field, value) {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="checkout-container">
      <div className="checkout-header">
        <Link to={"/cart"}>
            <Button  startIcon={<ArrowBack />}>
            Back to Cart
            </Button>
        </Link>
        <div>
          <Typography variant="h4" className="font-bold">Checkout</Typography>
          <Typography variant="body2" color="textSecondary">
            {cartCount} items in your cart
          </Typography>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">
          <CheckoutForm shippingInfo={shippingInfo} handleInputChange={handleInputChange}/>
        </div>
        <div className="checkout-right">
          <OrderSummary clearCart={clearCart} subtotal={subtotal} tax={tax} total={total} cartCount={cartCount} textBtn={"Place Order"} orderData={{ user, shippingInfo, cartItems, total }}/>  
        </div>
      </div>
    </main>
  );
};
