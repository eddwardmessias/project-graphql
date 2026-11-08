import { relations } from 'drizzle-orm';
import { idea } from './idea';
import { users } from './users';

export const ideaRelations = relations(idea, ({ one }) => ({
  author: one(users, {
    fields: [idea.authorId],
    references: [users.id],
    relationName: 'ideaAuthor',
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  ideas: many(idea, { relationName: 'ideaAuthor' }),
}));