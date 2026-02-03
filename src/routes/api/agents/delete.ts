import { createFileRoute } from '@tanstack/react-router'
import { sql, eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../../db/connection'
import { agents } from '../../../db/tables'

const deleteSchema = z.object({
  id: z.string().uuid(),
})

const serve = async ({ request }: { request: Request }) => {
  const body = await request.json()
  const { id } = deleteSchema.parse(body)

  const result = await db.transaction(async (tx) => {
    // Get txid inside the transaction for optimistic update reconciliation
    const txidResult = await tx.execute(
      sql`SELECT pg_current_xact_id()::xid::text as txid`
    )
    const txid = parseInt(txidResult[0].txid as string, 10)

    await tx.delete(agents).where(eq(agents.id, id))

    return { txid }
  })

  return Response.json(result)
}

export const Route = createFileRoute('/api/agents/delete')({
  server: {
    handlers: {
      POST: serve,
    },
  },
})
