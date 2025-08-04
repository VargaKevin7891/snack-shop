import { Box, Button, Typography, Paper } from '@mui/material';

export default function AdminOrderCard({ id, first_name, last_name, created_at, total,  onViewDetails }) {
  return (
    <Paper className="order-card">
      <Box>
        <Typography className="order-id">Order # {id}</Typography>
        <Typography>{first_name + ' ' + last_name}</Typography>
        <Typography>{created_at}</Typography>
      </Box>
      <Box textAlign="right">
        <Typography className="bold">{total} Ft</Typography>
        <Button
          size="small"
          className="admin-product-outline-btn"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
}
