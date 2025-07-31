import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as db from './db.js';

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: '*', // allowing all origins
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

try {
  await fastify.listen({ port: 3001 }, () => {console.log("Server started successfully!")})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}


