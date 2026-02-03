import { createFileRoute } from '@tanstack/react-router'
import { sql, eq } from 'drizzle-orm'
import { db } from '../../../db/connection'
import { agents } from '../../../db/tables'
import { agentSchema } from '../../../db/schema'

const serve = async ({ request }: { request: Request }) => {
  const body = await request.json()
  const agent = agentSchema.parse(body)

  const result = await db.transaction(async (tx) => {
    // Get txid inside the transaction for optimistic update reconciliation
    const txidResult = await tx.execute(
      sql`SELECT pg_current_xact_id()::xid::text as txid`
    )
    const txid = parseInt(txidResult[0].txid as string, 10)

    await tx
      .update(agents)
      .set({
        name: agent.name,
        type: agent.type,
        status: agent.status,
        prompt: agent.prompt,
        task: agent.task,
        result: agent.result,
        error_message: agent.error_message,
        updated_at: new Date(),
      })
      .where(eq(agents.id, agent.id))

    return { txid }
  })

  return Response.json(result)
}

export const Route = createFileRoute('/api/agents/update')({
  server: {
    handlers: {
      POST: serve,
    },
  },
})
