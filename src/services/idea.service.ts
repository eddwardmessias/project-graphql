import { eq } from 'drizzle-orm';
import { db } from "../database";
import { idea } from "../database/schemas";
import { createIdeaInput, updateIdeaInput } from "../dtos/input/idea.input";

export class IdeaService {

  async createIdea(data: createIdeaInput, authorId: string) {
    const [createdIdea] = db.insert(idea).values({
      title: data.title,
      description: data.description,
      authorId: authorId,
    }).returning().all();

    return createdIdea;
  }

  async listIdeas() {
    return db.select().from(idea).all();
  }

  findIdeaById(id: string) {
    return db.select().from(idea).where(eq(idea.id, id)).get();
  }

  async deleteIdea(id: string) {
    const findIdea = await db
    .select()
    .from(idea)
    .where(eq(idea.id, id))
    .get();

    if(!findIdea){
      throw new Error('Idea not found.');
    }
    return db.delete(idea).where(eq(idea.id, id)).returning().get();
  }

  async updateIdea(id: string, data: updateIdeaInput) {
    const ideaUpdated = await db
    .select()
    .from(idea)
      .where(eq(idea.id, id))
    .get();

    if (!ideaUpdated) {
      throw new Error('Idea not found.');
    }

    return db.update(idea)
    .set({
      title: data.title ?? ideaUpdated.title,
      description: data.description ?? ideaUpdated.description,
    })
    .where(eq(idea.id, id))
    .returning()
    .get();
  }
}
