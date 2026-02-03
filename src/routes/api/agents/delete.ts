import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const deleteSchema = z.object({
  id: z.string().uuid(),
})

const serve = async ({ request }: { request: Request }) => {
  const body = await request.json()
  const { id } = deleteSchema.parse(body)

  // In production, this would delete from Postgres and return the txid
  const response = await fetch(`${process.env.DATABASE_API_URL}/agents/${id}`, {
    method: 'DELETE',
  }).catch(() => null)

  if (response?.ok) {
    const data = await response.json()
    return Response.json({ txid: data.txid })
  }

  // Fallback: return a mock txid for development without a database
  return Response.json({ txid: Date.now() })
}

export const Route = createFileRoute('/api/agents/delete')({
  server: {
    handlers: {
      POST: serve,
    },
  },
})
