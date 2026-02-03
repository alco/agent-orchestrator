import { z } from 'zod'

export const AGENT_TYPES = ['claude', 'gpt', 'gemini', 'llama', 'custom'] as const
export type AgentType = (typeof AGENT_TYPES)[number]

export const AGENT_STATUSES = ['idle', 'running', 'error', 'completed'] as const
export type AgentStatus = (typeof AGENT_STATUSES)[number]

export const agentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(AGENT_TYPES),
  status: z.enum(AGENT_STATUSES),
  prompt: z.string().nullable(),
  task: z.string().nullable(),
  result: z.string().nullable(),
  error_message: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Agent = z.infer<typeof agentSchema>
