import type { ApolloFastifyContextFunctionArgument } from '@as-integrations/fastify';
import type { JwtPayload } from '../../shared/utils/jwt';

export type GraphQLContext = {
  user: JwtPayload | undefined;
  token: string | undefined;
  request: ApolloFastifyContextFunctionArgument[0];
  reply: ApolloFastifyContextFunctionArgument[1];
};

export const buildContext = async (
  request: ApolloFastifyContextFunctionArgument[0],
  reply: ApolloFastifyContextFunctionArgument[1],
): Promise<GraphQLContext> => {
  const authHeader = request.headers.authorization;
  let user: JwtPayload | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring('Bearer '.length);
    try {
      await request.jwtVerify();
      user = request.user as JwtPayload;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return { user, token, request, reply };
};
