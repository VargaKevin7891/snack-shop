# SnackShop Webshop

A full-stack snack webshop application built with **React**, **Material UI**, **Fastify**, and **SQLite**. This app allows users to browse products, manage a cart, and place orders. It also features an admin interface to manage products and view orders.
The frontend runs on localhost:5173.
The backend runs on localhost:3001.
You can start both of them by using **npm run full** command.

## Features
The application starts with a login screen, and without authentication you cannot access any sites other then the login page and register page. Upon unauthorised acces to a frontend endpoint the **<RouterControll />** component handles re-routing to the login screen.
The database creates 2 users on set-up.
Admin: 
    username: admin
    password: SnackBoss2025
User:
    username: user
    password: user123
After a successful authentication, it automatically redirects the user based on their role.

### User Side
- Browse products
- Search, Filter and sort products
- Add to cart, update quantity, delete cart item, clear cart and checkout
- Change profile data, such as default shipping information and password
- Order

### Admin Panel
- View and Add / Edit / Delete products
- View recent and all orders
- Expand order details in dialog view (user + items info)

### API endpoints
#### Products
- GET /api/products — Fetch all products
- GET /api/product/:id — Fetch single product
- GET /api/featured-products — Fetch featured products
- POST /api/products — Create product (Admin only)
- PUT /api/products/:id — Update product (Admin only)
- DELETE /api/products/:id — Delete product (Admin only)

#### Authentication & Profile
- POST /api/login — User login
- POST /api/register — User registration
- PUT /api/profile — Update user profile
- PUT /api/change-password — Change password
- POST /api/logout — Logout
- GET /api/getUser — Get logged-in user

#### Orders
- POST /api/order — Place an order
- GET /api/order/:id — Get single order
- GET /api/order-items/:id — Get order's items
- GET /api/orders — Get all orders (Admin only)
- GET /api/recent-orders — Get 4 most recent orders (Admin only)

### Database
The SQLite database includes the following tables:
- products: Product catalog with name, image, price, stock, and discount
- users: User profiles including role, address, and login credentials
- orders: Order metadata (user ID, shipping details, total price)
- order_items: Each item in an order (product ID, quantity, price, etc.)
Tables are created automatically via the *initDb()* function if they do not exist, filling items and users with some data.
Stores the core functions for getting or changing data in the tables.