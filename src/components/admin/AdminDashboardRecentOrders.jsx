import { useState, useEffect } from 'react';
import { Paper, Typography, Button, Link } from '@mui/material';
import AdminOrderCard from './AdminOrderCard';

export default function AdminDashboardRecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/admin/getRecentOrders', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Paper className="orders-box">
      <Typography variant="h6">Recent Orders</Typography>
      {orders.map((order) => (
        <AdminOrderCard key={order.id} {...order} />
      ))}
      <Link to="/admin/orders">
      <Button fullWidth className="view-orders-btn">View All Orders</Button>
      </Link>
    </Paper>
  );
}
