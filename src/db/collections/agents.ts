import { createCollection } from '@tanstack/react-db'
import { electricCollectionOptions } from '@tanstack/electric-db-collection'
import { agentSchema } from '../schema'

export const agentCollection = createCollection(
  electricCollectionOptions({
    id: 'agents',
    schema: agentSchema,
    getKey: (row) => row.id,
    shapeOptions: {
      url: new URL(
        '/api/agents',
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:5173'
      ).toString(),
      parser: {
        timestamptz: (date: string) => date,
      },
    },
    onInsert: async ({ transaction }) => {
      const agent = transaction.mutations[0].modified
      const response = await fetch('/api/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
      })
      const data = await response.json()
      return { txid: data.txid }
    },
    onUpdate: async ({ transaction }) => {
      const agent = transaction.mutations[0].modified
      const response = await fetch('/api/agents/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
      })
      const data = await response.json()
      return { txid: data.txid }
    },
    onDelete: async ({ transaction }) => {
      const id = transaction.mutations[0].key
      const response = await fetch('/api/agents/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      return { txid: data.txid }
    },
  })
)
