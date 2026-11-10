import { and, count, eq } from "drizzle-orm";
import { vote } from "../database/schemas";
import { db } from "../database";

export class voteService{
  async toggleVote(ideaId: string, userId: string): Promise<boolean> {
    const existingVote = await db
      .select()
      .from(vote)
      .where(and(eq(vote.ideaId, ideaId), eq(vote.userId, userId)))
      .get();

    if (existingVote) {
      await db.delete(vote).where(eq(vote.id, existingVote.id)).run();
      return false;
    } else {
      await db.insert(vote).values({  ideaId, userId }).run();
      return true;
    }
  }

  async listVotesByIdea(ideaId: string) {
    return db
      .select()
      .from(vote)
      .where(eq(vote.ideaId, ideaId))
      .all();
  }

  async countVotes(ideaId: string): Promise<number> {
    const result = await db
      .select({ total: count() })
      .from(vote)
      .where(eq(vote.ideaId, ideaId))
      .get();

    return result?.total ?? 0;
  }
}
