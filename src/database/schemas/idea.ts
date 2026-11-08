import { randomUUID } from 'node:crypto';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const idea = sqliteTable('ideas', {
  id: text('id').$defaultFn(() => randomUUID()).primaryKey(),

  title: text('title').notNull(),

  description: text('description'),

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
});
