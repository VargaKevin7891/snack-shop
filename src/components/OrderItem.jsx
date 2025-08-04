import {
  Card,
  CardContent,
  Typography
} from '@mui/material';

export default function OrderItem({ orderItem }) {
  return (
    <Card className="order-confirmation-item">
      <CardContent className="order-confirmation-item-container">
          <div className="order-confirmation-item-image">
            <img src={orderItem?.image} alt={orderItem?.name} className="order-confirmation-img" />
          </div>
          <div>
            <Typography className="order-confirmation-item-title">{orderItem.name}</Typography>
            <Typography>Quantity: {orderItem.quantity}</Typography>
          </div>
          <div className="text-right">
            <Typography className="order-confirmation-item-title">{orderItem.price * orderItem.quantity} Ft</Typography>
            <Typography>{orderItem.price} Ft each</Typography>
          </div>
      </CardContent>
    </Card>
  );
};