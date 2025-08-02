import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SimilarProductsSlider from '../components/SimilarProducts';

export default function ProductPage(props) {
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('product');
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:3001/api/product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });

      // Test Use Only - Should select by category excluding the current item, currently too few products on db  
      fetch(`http://localhost:3001/api/products`)
        .then((res) => res.json())
        .then((data) => {
          setSimilarProducts(data);
        });
    }
  }, [productId]);

  const handleIncrement = () => {
    if (product && count < product.stock) {
      setCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };

  if (!product) {
    return <Typography align="center" sx={{ padding: '2rem' }}>Product not found.</Typography>;
  }

  return (
    <>
    <Box className="product-section">
      <Box className="product-image">
        <img src={product.image} alt={product.name} />
      </Box>
      <Box className="product-details">
        <Typography variant="overline" className="product-category">
          {product.category}
        </Typography>
        <Typography variant="h4" className="product-name">
          {product.name}
        </Typography>
        {product.discount > 0 ?
          (<>
          <Typography variant="h5" className="product-price">
            ${(product.price - (product.price / product.discount)).toFixed(0)} <span className="original-price">{product.price} Ft</span>
          </Typography>
          
          </>)
          :
          (<Typography variant="h5" className="product-price">
            ${product.price}
          </Typography>)
        }
        
        <Typography variant="body1" className="product-description">
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </Typography>

        {product.stock > 0 && (
          <Box className="product-quantity">
            <IconButton onClick={handleDecrement}>
              <RemoveIcon className="quantity-btn"/>
            </IconButton>
            <Typography className="product-count">{count}</Typography>
            <IconButton onClick={handleIncrement}>
              <AddIcon className="quantity-btn"/>
            </IconButton>
          </Box>
        )}

        <Button
          onClick={() => props.addToCart(product, count)}
          disabled={product.stock === 0}
          className="add-to-cart-btn"
        >
          Add {count} to Cart
        </Button>
      </Box>
    </Box>
    {similarProducts.length > 0 ? (<SimilarProductsSlider products={similarProducts}/>) : null}
    
    </>
  );
}
