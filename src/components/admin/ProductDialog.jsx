import { Dialog, DialogTitle, DialogContent, TextField, InputAdornment, MenuItem, DialogActions, Button } from "@mui/material"

export default function ProductDialog({ open, handleClose, handleChange, handleSaveProduct, isEditMode, newProduct}) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="normal" value={newProduct.name} onChange={handleChange} />
          <TextField label="Image URL" name="image" fullWidth margin="normal" value={newProduct.image} onChange={handleChange} />
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={newProduct.category || 'Sweet Snack'}
            onChange={handleChange}
          >
            <MenuItem value="Sweet Snack">Sweet Snack</MenuItem>
            <MenuItem value="Salty Snack">Salty Snack</MenuItem>
            <MenuItem value="Healthy Snack">Healthy Snack</MenuItem>
          </TextField>
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">Ft</InputAdornment> }}
          />
          <TextField
            label="Discount"
            name="discount"
            fullWidth
            margin="normal"
            type="number"
            value={newProduct.discount}
            onChange={handleChange}
            InputProps={{ 
                inputProps: { step: 1, min: 0, max: 100 },
                endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          />
          <TextField
            label="Stock"
            name="stock"
            fullWidth
            margin="normal"
            type="number"
            value={newProduct.stock}
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">pcs</InputAdornment> }}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={newProduct.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="admin-product-outline-btn">Cancel</Button>
          <Button onClick={handleSaveProduct} className="admin-product-btn">
            {isEditMode ? 'Save Changes' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>
    )
}