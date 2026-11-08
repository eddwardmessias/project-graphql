import { eq } from "drizzle-orm";
import { users } from "../database/schemas";
import { ClientError } from "../shared/errors/app-error";
import { db } from "../database";

export class UserService {

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
