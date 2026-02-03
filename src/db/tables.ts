import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull().default('idle'),
  prompt: text('prompt'),
  task: text('task'),
  result: text('result'),
  error_message: text('error_message'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export type AgentRecord = typeof agents.$inferSelect
export type NewAgentRecord = typeof agents.$inferInsert
