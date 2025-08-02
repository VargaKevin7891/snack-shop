import {
  Card,
  CardContent,
  Typography,
  IconButton
} from '@mui/material';
import { Remove, Add, Close } from '@mui/icons-material';

export default function CartItem({ cartItem, quantity, updateQuantity, removeItem }) {
  return (
    <Card className="cart-item">
      <CardContent>
        <div className="cart-item-left">
          <div className="cart-item-image">
            <img src={cartItem?.image} alt={cartItem?.name} className="cart-img" />
          </div>

          <div className="cart-item-info">
            <div className="cart-item-title">
              <Typography variant="subtitle1">{cartItem?.name}</Typography>
            </div>

            {cartItem?.stock == 0 && (
              <div className="out-of-stock">Out of Stock</div>
            )}

            <div className="cart-item-actions">
              <div className="quantity-control">
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(cartItem?.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <span>{quantity}</span>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(cartItem?.id, quantity + 1)}
                  disabled={quantity >= cartItem?.stock}
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>

              <div className="cart-item-price">
                <Typography variant="body1">
                  {((cartItem.discount > 0 ? (cartItem.price - (cartItem.price / cartItem.discount)).toFixed(0) : cartItem.price)
                    * quantity)} Ft
                </Typography>
                <span>{cartItem.discount > 0 ? (cartItem.price - (cartItem.price / cartItem.discount)).toFixed(0) : cartItem.price} Ft each</span>
              </div>

              <IconButton
                onClick={() => removeItem(cartItem?.id)}
                className="remove-icon"
              >
                <Close fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};