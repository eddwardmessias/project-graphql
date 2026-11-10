import { randomUUID } from 'node:crypto';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { idea } from './idea';
import { users } from './users';

export const vote = sqliteTable(
  'votes',
  {
    id: text('id').$defaultFn(() => randomUUID()).primaryKey(),

    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    ideaId: text('idea_id')
      .notNull()
      .references(() => idea.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    userIdeaUnique: uniqueIndex('votes_user_idea_unique').on(
      table.userId,
      table.ideaId,
    ),
  }),
);
