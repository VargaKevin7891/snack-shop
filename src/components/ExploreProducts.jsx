import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ExploreSnacks() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/featured-products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <section className="explore-snacks">
      <header className="snacks-header">
        <h2>Explore Our Snacks</h2>
        <p>Discover your favorite treats from our wide variety of delicious snacks.</p>
      </header>

      <div className="snacks-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product} />
        ))}
      </div>

      <Button className="explore-more-container">
        <Link to="/products" className="explore-more-button">
            Explore More
        </Link>
      </Button>
    </section>
  );
}
