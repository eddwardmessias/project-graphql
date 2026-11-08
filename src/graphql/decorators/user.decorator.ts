import { createParameterDecorator, type ResolverData } from 'type-graphql';
import { eq } from 'drizzle-orm';
import { db } from '../../database';
import { users, type User } from '../../database/schemas';
import type { GraphQLContext } from '../context';
import { ClientError } from '../../shared/errors/app-error';

export const GqlUser = () => {
  return createParameterDecorator(({ context }: ResolverData<GraphQLContext>): User => {
    if (!context.user) {
      throw new ClientError('Not authenticated.', 401);
    }

    const user = db
      .select()
      .from(users)
      .where(eq(users.id, context.user.id))
      .get();

    if (!user) {
      throw new ClientError('User not found.', 404);
    }

    return user;
  });
};
