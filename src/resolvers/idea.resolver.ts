import { UserService } from './../services/user.service';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { createIdeaInput, updateIdeaInput } from "../dtos/input/idea.input";
import type { User } from "../database/schemas/users";
import { IdeaService } from "../services/idea.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { isAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";


@Resolver(() => IdeaModel)
@UseMiddleware(isAuth)
export class IdeaResolver {
  private readonly ideaService = new IdeaService();
  private readonly userService = new UserService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => createIdeaInput) data: createIdeaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id);
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg("data", () => updateIdeaInput) data: updateIdeaInput,
    @Arg("id", () => String) id: string
    // @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.updateIdea(id,data);
  }

  @Query(() => [IdeaModel])
  async listIdeas(): Promise<IdeaModel[]> {
    return this.ideaService.listIdeas();
  }

  @Mutation(() => Boolean)
  async deleteIdea(
    @Arg("id", () => String) id: string
  ): Promise<boolean> {
    const ideaDeleted = await this.ideaService.deleteIdea(id);
    return !!ideaDeleted;
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUser(idea.authorId);
  }
}
