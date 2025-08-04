import { useState, useEffect, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminProductCard from '../../components/admin/AdminProductCard.jsx'
import ProductSorting from '../../components/ProductSorting';
import AdminHeader from '../../components/admin/AdminHeader.jsx';
import ProductDialog from '../../components/admin/ProductDialog.jsx';

const initialProduct = {
  id: null,
  name: '',
  category: 'Sweet Snack',
  price: 0,
  stock: 0,
  discount: 0,
  description: '',
  image: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name-a');
  const categories = ['All', 'Sweet Snack', 'Salty Snack', 'Healthy Snack'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
      )
      .sort((a, b) => {
      switch (sortBy) {
        case 'name-a':
          return a.name.localeCompare(b.name);
        case 'name-z':
          return b.name.localeCompare(a.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [products, search, selectedCategory, sortBy]);

   function handleOpen() {
    setOpen(true);
  }

   function handleClose() {
    setOpen(false);
    setNewProduct(initialProduct);
    setIsEditMode(false);
    setEditIndex(null);
  }

   function handleChange(e) {
  const { name, value } = e.target;

  let newValue = value;
  if (name === 'discount') {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      newValue = Math.min(100, Math.max(0, num));
    } else {
      newValue = '';
    }
  }

  setNewProduct({ ...newProduct, [name]: newValue });
}

async function handleSaveProduct() {
  if (isEditMode && editIndex !== null) {
    // Update existing product
    try {
      const response = await fetch(`http://localhost:3001/api/product/${newProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          discount: parseInt(newProduct.discount) || 0,
          stock: parseInt(newProduct.stock) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updated = [...products];
      updated[editIndex] = { ...newProduct, price: parseFloat(newProduct.price) };
      setProducts(updated);
      handleClose();
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }

  } else {
    // Create new product
    try {
      const newEntry = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        discount: parseInt(newProduct.discount) || 0,
        stock: parseInt(newProduct.stock) || 0,
      };

      const response = await fetch('http://localhost:3001/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setProducts([...products, newEntry]);
      handleClose();
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  }
}


   function handleEditProduct(product) {
    const index = products.findIndex((p) => p.id === product.id);
    setIsEditMode(true);
    setEditIndex(index);
    setNewProduct(product);
    setOpen(true);
  }

  return (
    <Box className="admin-products-container">
      <AdminHeader title="Products" subtitle="Manage products" children={
        <Button startIcon={<AddIcon />} onClick={handleOpen} className="admin-product-btn">
          Add Product
        </Button>}/>

      <ProductSorting
                    search={search}
                    setSearch={setSearch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    categories={categories}
                  />

      <Box className="admin-product-list">
        {filteredProducts.map((product) => (
          <AdminProductCard key={product.id} product={product} handleEditProduct={handleEditProduct}/>
        ))}
      </Box>

      <ProductDialog open={open} handleChange={handleChange} handleClose={handleClose} handleSaveProduct={handleSaveProduct} 
      isEditMode={isEditMode} newProduct={newProduct} />
    </Box>
  );
};