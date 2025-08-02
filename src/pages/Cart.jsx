import {
  Typography, Button, Card, CardContent, CardHeader, Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CartItem from '../components/CartItem';

export default function Cart({ cartCount, cartItems, updateQuantity, removeItem }) {
  let subtotal = cartItems.reduce((sum, [product, quantity]) => {
  const price = (product.discount > 0 ? (product.price - (product.price / product.discount)) : product.price).toFixed(0);
  return sum + (price * quantity);
}, 0);
  const tax = subtotal * 0.25;
  subtotal = subtotal - tax;
  const total = subtotal + tax;

  return (
    <main className="cart-container">
      <div className="cart-header">
        <Button  startIcon={<ArrowBack />}>
          Continue Shopping
        </Button>
        <div>
          <Typography variant="h4" className="font-bold">Shopping Cart</Typography>
          <Typography variant="body2" color="textSecondary">
            {cartCount} items in your cart
          </Typography>
        </div>
      </div>

      <div className="cart-content">
        {cartItems.length > 0 ?
        (    <div className="cart-left">
            {cartItems.map(([product, quantity]) => (
                <CartItem
                    key={product.id}
                    cartItem={product}
                    quantity={quantity}
                    updateQuantity={(id, newQty) => updateQuantity(id, newQty)}
                    removeItem={() => removeItem(product.id)}
                />
            ))}
            </div>)
            :
        (<div className="cart-left">No items added to cart!</div>)
        }

        <div className="cart-right">
          <Card className="order-summary">
            <CardHeader title="Order Summary" />
            <CardContent>
              <div className="summary-row"><span>Subtotal</span><span>{subtotal.toFixed(0)} Ft</span></div>
              <div className="summary-row"><span>Shipping</span><span className="success">Free</span></div>
              <div className="summary-row"><span>Tax</span><span>{tax.toFixed(0)} Ft</span></div>
              <Divider />
              <div className="summary-row total"><span>Total</span><span>{total.toFixed(0)} Ft</span></div>
              <Button
                variant="contained"
                className="checkout-btn"
                disabled={cartItems.some(item => item.stock > 0)}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
