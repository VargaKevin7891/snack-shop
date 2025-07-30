import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import ProductSorting from '../components/ProductSorting';

/* Fetching potentional 'category' filter from URL */
function fetchURL() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductList() {
  const location = useLocation();
  /* Products */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  /* Filtering and sorting */
  const [urlParam, setUrlParam] = useState(fetchURL());
  const initialCategory= urlParam.get('category') || 'All';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name-a');
  const categories = ['All', 'Sweet Snack', 'Salty Snack', 'Healthy Snack'];

  /* In-case endpoint is /products when changing to /products?category=X from NavBar, view won't re-render properly*/
  /* So I update the category when that happens manually */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryFromURL = query.get('category') || 'All';
    setSelectedCategory(categoryFromURL);
  }, [location.search]);

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

  return (
        <Container maxWidth="lg" style={{ padding: '2rem 0' }}>
            <h1 className="products-title">Product catalouge</h1>
            <ProductSorting
              search={search}
              setSearch={setSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />
            <Grid container spacing={4} className="product-container">
                {
                  filteredProducts.length > 0 ? 
                  (filteredProducts.map(product => (
                    <Grid key={product.id}>
                        <ProductCard
                            {...product}
                        />
                    </Grid>
                )))
                :
                (
                  <div className="no-results">
                    <h2>No products found</h2>
                    <p>Try adjusting your filters or search term.</p>
                  </div>
                )
                }
            </Grid>
        </Container>
    );
}
