import { eq } from "drizzle-orm";
import { users } from "../database/schemas";
import { ClientError } from "../shared/errors/app-error";
import { db } from "../database";
import { createUserInput } from "../dtos/input/user.input";

export class UserService {


  async createUser(data: createUserInput){
    const findUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .get();

    if(findUser){
      throw new ClientError('Email already registered.', 409);
    }

    const [user] = await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email
      })
      .returning();
  }

  async findUser(id: string){
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .get();

    if (!user) {
      throw new ClientError('User not found.', 404);
    }

    return user;
  }
}
