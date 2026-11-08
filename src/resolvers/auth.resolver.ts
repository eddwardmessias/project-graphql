import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { FastifyReply } from 'fastify';
import { LoginInput, RegisterInput } from '../dtos/input/auth.input';
import { LoginOutput, RegisterOutput } from '../dtos/output/auth.output';
import { AuthService } from '../services/auth.service';

type GraphQLContext = {
  reply: FastifyReply;
};

@Resolver()
export class AuthResolver {
  private readonly authService = new AuthService();

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput,
    @Ctx() context: GraphQLContext,
  ): Promise<LoginOutput> {
    const user = await this.authService.login(data);
    return this.authService.generateTokens(context.reply, user);
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
