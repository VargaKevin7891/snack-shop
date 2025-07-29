import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product List</h2>
      <h3>products: {products.length}</h3>
      {products.map( product => (
        <ProductCard
          key= {product.id}
          {...product}/>
      ))}
    </div>
  );
}
