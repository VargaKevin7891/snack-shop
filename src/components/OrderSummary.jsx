import { ArrowRight, Delete } from '@mui/icons-material';
import {
  Button, Card, CardContent, CardHeader, Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function OrderSummary({ subtotal, tax, total, cartCount, textBtn, targetBtn, clearCart, orderData }) {
  async function handlePlaceOrder() {
    try {
      const res = await fetch('http://localhost:3001/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Order placement failed.');
      }

      const result = await res.json();
      alert(`Order Placed! ID: ${result.orderId}`);
      clearCart();
    } catch (err) {
      alert(`Failed: ${err.message}`);
    }
  };


  return (
    <Card className="order-summary">
        <CardHeader title="Order Summary" />
        <CardContent>
          <div className="summary-row"><span>Subtotal</span><span>{subtotal.toFixed(0)} Ft</span></div>
          <div className="summary-row"><span>Shipping</span><span className="success">Free</span></div>
          <div className="summary-row"><span>Tax</span><span>{tax.toFixed(0)} Ft</span></div>
          <Divider />
          <div className="summary-row total"><span>Total</span><span>{total.toFixed(0)} Ft</span></div>
          <Link
            to={cartCount > 0 ? targetBtn : '#'}
            style={{ pointerEvents: cartCount <= 0 ? 'none' : 'auto' }}
            >
            <Button
                variant="contained"
                className="order-summary-btn"
                disabled={cartCount <= 0}
                onClick={orderData ? handlePlaceOrder : null}
            >
                {textBtn} <ArrowRight />
            </Button>
          </Link>
          {targetBtn == '/checkout' ? 
            (<Button
              variant="contained"
              className="cart-clear-btn"
              onClick={clearCart}
          >
              Clear cart <Delete />
          </Button>)
          :
          null
          }
        </CardContent>
    </Card>
  );
};