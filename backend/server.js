import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initDb, getAllProducts } from './db.js';

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: '*', // allowing all origins
});

initDb();

fastify.get('/api/products', async (request, reply) => {
  return getAllProducts(); 
});

try {
  await fastify.listen({ port: 3001 }, () => {console.log("Server started successfully!")})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}


