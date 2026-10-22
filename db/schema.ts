import { pgTable, text, jsonb } from 'drizzle-orm/pg-core';

export const gameSessions = pgTable('game_sessions', {
  id: text('id').primaryKey(),
  state: jsonb('state'),
});
