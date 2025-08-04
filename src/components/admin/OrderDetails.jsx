import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function OrderDetailsDialog({ open, onClose, order }) {
  if (!order) return null;

  const {
    id,
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    zip_code,
    total,
    created_at,
    items = [],
  } = order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order #{id} Details</DialogTitle>
      <DialogContent>
        <Box className="order-info-box">
          <Typography><strong>Name:</strong> {first_name} {last_name}</Typography>
          <Typography><strong>Email:</strong> {email}</Typography>
          <Typography><strong>Phone:</strong> {phone}</Typography>
          <Typography><strong>Address:</strong> {address}, {city}, {zip_code}</Typography>
          <Typography><strong>Total:</strong> {total} Ft</Typography>
          <Typography><strong>Created At:</strong> {created_at}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom><strong>Ordered Products</strong></Typography>
        <Box className="order-dialog-list-box">
          <List>
            {items.map((item, index) => (
              <ListItem key={index} className="order-dialog-item">
                <img src={item.image} alt={item.name} className="order-dialog-image" />
                <ListItemText
                  primary={`${item.name} (${item.quantity} pcs)`}
                  secondary={`${item.price} Ft each`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
}