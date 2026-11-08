import { Middleware } from "type-graphql/build/typings/typings/middleware";

export const isAuth: Middleware = async ({ context }, next) => {
  if (!context.user) {
    throw new Error("Not authenticated");
  }
  return next();
}
