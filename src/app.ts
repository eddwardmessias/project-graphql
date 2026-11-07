import 'reflect-metadata';
import 'dotenv/config';
import fastify from 'fastify';
import { ApolloServer } from '@apollo/server';
import fastifyJwt from '@fastify/jwt';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { buildSchema } from 'type-graphql';
import type { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes/index';
import { AuthResolver } from './resolvers/auth.resolvers';
import { errorHandler } from './shared/errors/app-error';

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
});

const schema = await buildSchema({
  resolvers: [AuthResolver],
  validate: false,
  emitSchemaFile: './schema.gql',
});

type GraphQLContext = {
  request: FastifyRequest;
  reply: FastifyReply;
};

const apollo = new ApolloServer<GraphQLContext>({
  schema,
  plugins: [fastifyApolloDrainPlugin(server)],
});

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required to start the server.');
}

await server.register(fastifyJwt, {
  secret: jwtSecret,
});

await apollo.start();
await server.register(fastifyApollo<GraphQLContext>(apollo), {
  path: '/graphql',
  context: async (request, reply) => ({ request, reply }),
});

server.setErrorHandler(errorHandler);
routes(server);

export { server };
