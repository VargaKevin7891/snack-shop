import {
  Typography, Button, Card, CardContent, CardHeader, Divider
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { Link } from 'react-router-dom';

export default function Cart({ cartCount, cartItems, updateQuantity, clearCart, removeItem, subtotal, tax, total }) {
  return (
    <main className="cart-container">
      <div className="cart-header">
        <Link to={"/products"}>
            <Button  startIcon={<ArrowBack />}>
            Continue Shopping
            </Button>
        </Link>
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
          <OrderSummary clearCart={clearCart} subtotal={subtotal} tax={tax} total={total} cartCount={cartCount} textBtn={"Proceed to Checkout"} targetBtn={"/checkout"}/>
        </div>
      </div>
    </main>
  );
};
