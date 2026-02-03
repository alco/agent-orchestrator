import { createFileRoute } from '@tanstack/react-router'
import { agentSchema } from '../../../db/schema'

const serve = async ({ request }: { request: Request }) => {
  const body = await request.json()
  const agent = agentSchema.parse(body)

  // In production, this would insert into Postgres and return the txid
  // For now, we simulate the response
  const response = await fetch(`${process.env.DATABASE_API_URL}/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  }).catch(() => null)

  if (response?.ok) {
    const data = await response.json()
    return Response.json({ txid: data.txid })
  }

  // Fallback: return a mock txid for development without a database
  return Response.json({ txid: Date.now() })
}

export const Route = createFileRoute('/api/agents/create')({
  server: {
    handlers: {
      POST: serve,
    },
  },
})
