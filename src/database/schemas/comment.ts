import { randomUUID } from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { idea } from './idea';
import { users } from './users';

export const comment = sqliteTable('comments', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),

  content: text('content'),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),

  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  ideaId: text('idea_id')
    .notNull()
    .references(() => idea.id, { onDelete: 'cascade' }),

});
