import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { CreateCommentInput } from "../dtos/input/comment.input";
import { UserService } from "../services/user.service";
import { isAuth } from "../middlewares/auth.middleware";


@Resolver(() => CommentModel)
@UseMiddleware(isAuth)
export class CommentResolver {

  private commentService = new CommentService();
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => CommentModel)
  async createComment(
    @Arg('ideaId', () => String) ideaId: string,
    @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: UserModel
  ): Promise<CommentModel> {
    return this.commentService.create(
      ideaId,
      user.id,
      data
    );
  } 

  @FieldResolver(() => IdeaModel)
  async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findIdeaById(comment.ideaId);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return this.userService.findUser(comment.authorId);
  }
}
