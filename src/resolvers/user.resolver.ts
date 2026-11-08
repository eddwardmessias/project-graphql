import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { isAuth } from "../middlewares/auth.middleware";
import { createUserInput } from "../dtos/input/user.input";

@Resolver(()=> UserModel)
@UseMiddleware(isAuth)
export class UserResolver {
  private readonly userService = new UserService();

  @Mutation(() => UserModel)
  async createUser(@Arg("data", () => createUserInput) data: createUserInput): Promise<UserModel> {
    return await this.userService.createUser(data);
  }

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel>{
    return await this.userService.findUser(id);
  }
}
