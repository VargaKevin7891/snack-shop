import {
  Box,
  InputBase,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function ProductSorting({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}) {
  return (
    <Box className="product-sorting">
      {/* Search Field */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <InputBase
          fullWidth
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            pl: 4,
            py: 1.5,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: 'white',
          }}
          startAdornment={
            <InputAdornment position="start" sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}>
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          }
        />
      </Box>

      {/* Category Select */}
      <FormControl sx={{ minWidth: 180 }}>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
            Category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort Select */}
      <FormControl sx={{ minWidth: 180 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Sort by
          </MenuItem>
          <MenuItem value="name-a">Name A-Z</MenuItem>
          <MenuItem value="name-z">Name Z-A</MenuItem>
          <MenuItem value="price-low">Price: Low to High</MenuItem>
          <MenuItem value="price-high">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
