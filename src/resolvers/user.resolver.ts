import { Arg, Query, Resolver } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(()=> UserModel)
export class UserResolver {
  private readonly userService = new UserService();


  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel>{
    return await this.userService.findUser(id);
  }
}
