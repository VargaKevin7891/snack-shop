import { Box, Card, CardContent, Typography, Button } from '@mui/material';

export default function AdminProductCard({ product, handleEditProduct, handleDeleteProduct }) {
  return (
    <Card className="admin-product-card" key={product.id}>
        <Box className="admin-product-info">
          <Box
              component="img"
              src={product?.image}
              className="admin-product-img"
          />
          <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="subtitle2">{product.category}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              {
                product.discount > 0 ? (
                  <Typography className="product-price">{product.price - (product.price * product.discount / 100).toFixed(0)} Ft  <Typography variant='small' className="original-price">{product.price} Ft</Typography></Typography>)
                  :
                  <Typography  className="product-price">{product.price} Ft</Typography>
              }
              <Typography>Discount: {product.discount}%</Typography>
              <Typography>Stock: {product.stock}</Typography>
          </CardContent>
          <Box className="admin-product-actions">
              <Button className="admin-product-outline-btn" onClick={() => handleEditProduct(product)}>
              Edit
              </Button>
              <Button className="admin-product-delete-btn" onClick={() => handleDeleteProduct(product.id)}>
              Delete
              </Button>
          </Box>
        </Box>
    </Card>
  )
};