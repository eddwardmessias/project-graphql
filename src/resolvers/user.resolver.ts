import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { isAuth } from "../middlewares/auth.middleware";

@Resolver(()=> UserModel)
@UseMiddleware(isAuth) // Na explicação me informe esse conceito de middleware, e como ele funciona no contexto do GraphQL e TypeGraphQL. como proteger cada query e mutation com autenticação, e como o middleware é aplicado a cada resolver ou campo específico.
export class UserResolver {
  private readonly userService = new UserService();


  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel>{
    return await this.userService.findUser(id);
  }
}
