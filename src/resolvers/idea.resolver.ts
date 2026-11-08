import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { createIdeaInput } from "../dtos/input/idea.input";
import type { User } from "../database/schemas/users";
import { IdeaService } from "../services/idea.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { isAuth } from "../middlewares/auth.middleware";


@Resolver(() => IdeaModel)
@UseMiddleware(isAuth)
export class IdeaResolver {
  private readonly ideaService = new IdeaService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => createIdeaInput) data: createIdeaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id);
  }
}
