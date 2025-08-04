import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import logo from "/snackshop_logo.png"
import { Dashboard, Inventory, ShoppingCart, Logout } from '@mui/icons-material';

const categories = ['Home', 'Products', 'Salty Snack', 'Sweet Snack', 'Healthy Snacks'];

export default function Header(props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(props.userData);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen)
  };

  useEffect(() => {
    setUser(props.userData);
  }, [props.userData]);

  function toggleDrawer (open) {
    setDrawerOpen(open);
  };

  function handleMenu(event) {
    setProfileOpen(isOpen => !isOpen);
    setAnchorElProfile(event.currentTarget);
  };

  function getCategoryPath(category) {
  switch (category.toLowerCase()) {
    case 'home':
      return '/';
    case 'products':
      return '/products';
    case 'sweet snack':
      return '/products?category=Sweet Snack';
    case 'salty snack':
      return '/products?category=Salty Snack';
    case 'healthy snacks':
      return '/products?category=Healthy Snack';
    case 'about us':
      return '/about';
    case 'deals':
      return '/deals';
    default:
      return '/';
  }
}

const handleLogout = async () => {
    await fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    props.onLogout();
    navigate('/');
  };

  

  if(props.isAdmin){
   return (
    <>
      <IconButton className="sidebar-toggle" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>

      <Box className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <List>
          <ListItem>
            <Link to="/admin">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </Link>      
          </ListItem>
          <ListItem>
            <Link to="/admin/products">
              <ListItemIcon><Inventory /></ListItemIcon>
              <ListItemText primary="Products" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/admin/orders">
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="Orders" />
            </Link>
          </ListItem>
          <ListItem>
            <Link onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
    )
  }

  return (
    <Box className="navbar">
      {/* Top App Bar */}
      <AppBar className="navbar-top" position='relative'>
        <Toolbar className="navbar-toolbar">

          {/* Mobile Menu Icon */}
          <Box className="menu-button-mobile">
            <IconButton edge="start" color="inherit" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo Icon */}
          <Box className="logo-desktop-only">
            <img src={logo} alt="Logo" /> SnackShop
          </Box>

          {/* Search */}
          <Box className="navbar-search">
            <Button className="navbar-search-icon">
              <SearchIcon />
            </Button>
            <InputBase
              placeholder="Search…"
              classes={{ input: 'navbar-search-input' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          {/* Cart + Profile */}
          <Box className="profile-button" >
            {/* Cart*/}
            <Link to="/cart">
            <IconButton color="inherit" aria-label="cart">
              <Badge badgeContent={props.cartCount} color="error">
                <ShoppingCartIcon alt="Cart" className='navbar-svg'/>
              </Badge>
            </IconButton>
            </Link>

            {/*Profile */}
            <IconButton onClick={handleMenu} className="avatar-button" color="inherit">
              <AccountCircle alt="Profile" className='navbar-svg' />
            </IconButton>
            <Menu
                      id="menu-appbar"
                      anchorEl={anchorElProfile}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(profileOpen)}
                      onClose={handleMenu}
                    >
                      {user == null
                        ? [
                            <Link key="login" to="/login">
                            <MenuItem  onClick={handleMenu}>
                              Login
                            </MenuItem>
                            </Link>,
                            <Link key="register" to="/register">
                            <MenuItem  onClick={handleMenu}>
                              Register
                            </MenuItem>
                            </Link>
                          ]
                        : [
                            <Link key="profile" to="/profile">
                            <MenuItem  onClick={handleMenu}>
                              Profile
                            </MenuItem>
                            </Link>,
                            <Link key="logout" onClick={handleLogout}>
                              <MenuItem  onClick={handleMenu}>
                                Logout
                              </MenuItem>
                            </Link>
                          ]
                      }
                    </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Bottom NavBar with NavLinks (Desktop Only) */}
      <AppBar elevation={1} className="navbar-bottom" position='relative'>
        <Toolbar variant="dense">
          <Stack direction="row" spacing={2}>
            {categories.map((category) => (
              <Link key={category} to={getCategoryPath(category)}>
                <Button className="navbar-category-button">
                  {category}
                </Button>
              </Link>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Drawer (Off-canvas) for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box className="drawer-content" role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
            <div className="drawer-logo">
                <img className="drawer-logo-icon" src={logo} alt="Logo" />
            </div>
          <List>
            {categories.map((category) => (
              <Link key={category} to={getCategoryPath(category)}  style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding >
                    <ListItemButton className="navbar-category-button">
                        <ListItemText primary={category} />
                    </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
