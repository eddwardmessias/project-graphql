import { eq } from "drizzle-orm";
import { db } from "../database";
import { comment, idea } from "../database/schemas";
import { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
  async create(ideaId: string, authorId: string, data: CreateCommentInput) {
    const findIdea = await db
    .select()
    .from(idea)
    .where(eq(idea.id, ideaId))
    .get();

    if (!findIdea) {
      throw new Error("Idea not found");
    }

    return db.insert(comment).values({
      content: data.content,
      authorId,
      ideaId,
    }).returning().get();
  }
}
