import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './tables'

function createConnection() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  const client = postgres(connectionString)
  return drizzle(client, { schema })
}

// Lazy initialization - only connects when first used
let _db: ReturnType<typeof createConnection> | null = null

export function getDb() {
  if (!_db) {
    _db = createConnection()
  }
  return _db
}

// For convenience, but only use in server code
export const db = new Proxy({} as ReturnType<typeof createConnection>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof createConnection>]
  },
})
