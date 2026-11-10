import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { VoteModel } from "../models/vote.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "../database/schemas";
import { voteService } from "../services/vote.service";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => VoteModel)
export class VoteResolver {
  private readonly voteService = new voteService();
  private readonly ideaService = new IdeaService();
  private readonly userService = new UserService();

  @Mutation(() => Boolean)
  async toggleVote(
    @Arg("ideaId", () => String) ideaId: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.voteService.toggleVote(ideaId, user.id);
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() vote: VoteModel): Promise<IdeaModel> {
    return this.ideaService.findIdeaById(vote.ideaId);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.findUser(vote.userId);
  }
}
