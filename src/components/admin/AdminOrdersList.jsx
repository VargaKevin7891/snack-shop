import { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminOrderCard from './AdminOrderCard';
import OrderDetailsDialog from './OrderDetails';

export default function AdminOrdersList({ isAll }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const endpoint = isAll ? "orders" : "recent-orders" ;

  useEffect(() => {
    fetch(`http://localhost:3001/api/${endpoint}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err))
  }, []);

  function handleOpenDialog(order) {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <Paper className="orders-box">
      <Typography variant="h6">{isAll ? "" : "Recent "}Orders</Typography>
      {orders.map((order) => (
        <AdminOrderCard key={order.id} {...order} onViewDetails={() => handleOpenDialog(order)}/>
      ))}
      {isAll ?
      null
      :
      <Link to="/admin/orders">
        <Button fullWidth className="view-orders-btn">View All Orders</Button>
      </Link>
      }

      <OrderDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        order={selectedOrder}
      />
    </Paper>
  );
}
