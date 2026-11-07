import type { FastifyInstance } from 'fastify';

// import usersRoutes from '../modules/users/users.routes.ts';

export default function routes(server: FastifyInstance) {
  server.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  // usersRoutes(server);
}
