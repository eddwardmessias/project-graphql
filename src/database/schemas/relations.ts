import { relations } from 'drizzle-orm';
import { comment } from './comment';
import { idea } from './idea';
import { users } from './users';
import { vote } from './vote';

export const ideaRelations = relations(idea, ({ one, many }) => ({
  author: one(users, {
    fields: [idea.authorId],
    references: [users.id],
    relationName: 'ideaAuthor',
  }),
  comments: many(comment, { relationName: 'ideaComments' }),
  votes: many(vote, { relationName: 'ideaVotes' }),
}));

export const userRelations = relations(users, ({ many }) => ({
  ideas: many(idea, { relationName: 'ideaAuthor' }),
  comments: many(comment, { relationName: 'commentAuthor' }),
  votes: many(vote, { relationName: 'voteUser' }),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(users, {
    fields: [comment.authorId],
    references: [users.id],
    relationName: 'commentAuthor',
  }),
  idea: one(idea, {
    fields: [comment.ideaId],
    references: [idea.id],
    relationName: 'ideaComments',
  }),
}));

export const voteRelations = relations(vote, ({ one }) => ({
  user: one(users, {
    fields: [vote.userId],
    references: [users.id],
    relationName: 'voteUser',
  }),
  idea: one(idea, {
    fields: [vote.ideaId],
    references: [idea.id],
    relationName: 'ideaVotes',
  }),
}));
