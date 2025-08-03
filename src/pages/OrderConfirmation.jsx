import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Grid, Divider, Box } from '@mui/material';
import { Inventory } from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import OrderItem from '../components/OrderItem';


export default function OrderConfirmation() {
  const location = useLocation();
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId');

  useEffect(() => {
    fetch(`http://localhost:3001/api/order/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => setError(err.message))

    fetch(`http://localhost:3001/api/order-items/${orderId}`)
      .then(res => res.json())
      .then(data => setOrderItems(data))
      .catch(err => setError(err.message))
  }, []);

  if (error) {
    return (
      <Container className="order-confirmation-container">
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }



  return (
    <Container className="order-confirmation-container">
      <Typography variant="h4" className="order-confirmation-title">
        Thank You for Your Order!
      </Typography>
      <Typography className="order-confirmation-subtitle">
        We've received your order and will start processing it shortly.
      </Typography>

        <Paper className="order-confirmation-box">
          <Typography variant="h6" className="order-confirmation-section-title">
            <Inventory /> Order Confirmation
          </Typography>
        <Box className="order-confirmation-info">
          <Typography className="order-confirmation-id">Order #{order.id}</Typography>
          <Box className="order-confirmation-placed">
            <span>Order placed : {order.created_at} </span>
          </Box>
        </Box>
        <Grid container className="order-confirmation-summary">
          <Grid>
            <Typography>Email</Typography>
            <Typography>{order.email}</Typography>
          </Grid>
          <Grid>
            <Typography>Total</Typography>
            <Typography> {order.total} Ft</Typography>
          </Grid>
        </Grid>

        <Typography className="section-subtitle">Items Ordered</Typography>
          {orderItems.map((item, idx) => (
            <OrderItem orderItem={item} key={idx}/>
          ))}
        </Paper>

        <Paper className="shipping-box">
          <Typography variant="h6" className="order-confirmation-section-title">
            <LocalShippingIcon /> Shipping Information
          </Typography>
          <Typography className="section-subtitle">Shipping Address:</Typography>
          <Typography>{order.first_name} {order.last_name}</Typography>
          <Typography>{order.address}</Typography>
          <Typography>{order.city}, {order.zip_code}</Typography>
        </Paper>
    </Container>
  );
}