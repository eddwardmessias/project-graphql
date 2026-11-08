import { db } from "../database";
import { idea } from "../database/schemas";
import { createIdeaInput } from "../dtos/input/idea.input";

export class IdeaService {

  async createIdea(input: createIdeaInput, authorId: string) {
    const [createdIdea] = db.insert(idea).values({
      title: input.title,
      description: input.description,
      authorId: authorId,
    }).returning().all();

    return createdIdea;
  }
}
