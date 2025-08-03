import Fastify from 'fastify';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import * as db from './db.js';
import { loginUser, registerUser, updateProfile, changePassword } from './services/userService.js';
import { placeOrder } from './services/orderService.js';

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: 'http://localhost:5173', // allowing all origins from frontend
  credentials: true,
  methods: 'HEAD,GET,POST,PUT,DELETE'
});

await fastify.register(fastifyCookie);
await fastify.register(fastifySession, {
  secret: '6abbc20a-6050-4935-850f-550469a6d23f',
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  },
  saveUninitialized: false,
});

db.initDb();

fastify.get('/api/products', async (request, reply) => {
  return db.getAllProducts(); 
});

fastify.get('/api/product/:id', async (request, reply) => {
  const { id } = request.params;
  const product = db.getProduct(id);
  if (!product) {
    return reply.code(404).send({ error: 'Product not found' });
  }

  return product;
});

fastify.get('/api/featured-products', async (request, reply) => {
  return db.getFeaturedProducts(); 
});

fastify.post('/api/login', async (req, reply) => {
  const { username, password } = req.body;
  const user = await loginUser(username, password);

  if (!user) {
    return reply.code(401).send({ error: 'Invalid credentials' });
  }

  req.session.user = user;
  reply.send({ message: 'Logged in', user });
});

fastify.post('/api/register', async (req, reply) => {
  const { username, password } = req.body;

  try {
    const user = await registerUser(username, password);
    reply.send({ message: 'Registration successful', user });
  } catch (err) {
    const code = err.statusCode || 500;
    reply.code(code).send({ error: err.message });
  }
});

fastify.put('/api/profile', async (req, reply) => {
  try {
    const userId = req.session.user?.id;
    if (!userId) return reply.code(401).send({ error: 'Unauthorized' });

    await updateProfile(userId, req.body);
    reply.send({ success: true });
  } catch (err) {
    reply.code(err.statusCode || 500).send({ error: err.message || 'Server error' });
  }
});

fastify.put('/api/change-password', async (req, reply) => {
  try {
    const userId = req.session.user?.id;
    if (!userId) return reply.code(401).send({ error: 'Unauthorized' });

    const { currentPassword, newPassword } = req.body;
    await changePassword(userId, currentPassword, newPassword);

    reply.send({ success: true });
  } catch (err) {
    reply.code(err.statusCode || 500).send({ error: err.message || 'Server error' });
  }
});

fastify.post('/api/logout', async (req, reply) => {
  req.session.destroy();
  reply.send({ message: 'Logged out' });
});

fastify.get('/api/getUser', async (req, reply) => {
  if (!req.session.user) {
    return reply.code(401).send({ error: 'Not authenticated' });
  }

  reply.send(req.session.user);
});

fastify.post('/api/order', async (request, reply) => {
  try {
    const result = placeOrder(request.body);
    reply.send({ success: true, orderId: result.orderId });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ success: false, error: 'Failed to place order' });
  }
});

fastify.get('/api/order/:id', async (request, reply) => {
  const { id } = request.params;
  const order = db.getOrder(id);
  if (!order) {
    return reply.code(404).send({ error: 'Order not found' });
  }

  return order;
});

fastify.get('/api/order-items/:id', async (request, reply) => {
  const { id } = request.params;
  const orderItems = db.getOrderItems(id);
  if (!orderItems) {
    return reply.code(404).send({ error: 'Order not found' });
  }

  return orderItems;
});

fastify.get('/api/admin-data', async (req, reply) => {
  const user = req.session.user;
  if (!user || user.role !== 'admin') {
    return reply.code(403).send({ error: 'Forbidden' });
  }
   reply.send({ secret: 'Admin-only content' });
});

try {
  await fastify.listen({ port: 3001 }, () => {console.log("Server started successfully!")})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}


