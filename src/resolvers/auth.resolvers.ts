import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { FastifyReply } from 'fastify';
import { RegisterInput } from '../dtos/input/auth.input';
import { RegisterOutput } from '../dtos/output/auth.output';
import { AuthService } from '../services/auth.service';

type GraphQLContext = {
  reply: FastifyReply;
};

@Resolver()
export class AuthResolver {
  private readonly authService = new AuthService();
  @Query(() => String)
  health(): string {
    return 'ok';
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg('data', () => RegisterInput) data: RegisterInput,
    @Ctx() context: GraphQLContext,
  ): Promise<RegisterOutput> {

    const user = await this.authService.register(data);

    return this.authService.generateTokens(context.reply, user);
  }
}
