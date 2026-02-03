import { Badge } from '@radix-ui/themes'
import type { AgentStatus } from '../db/schema'

interface StatusBadgeProps {
  status: AgentStatus
}

const statusConfig: Record<AgentStatus, { color: 'gray' | 'blue' | 'red' | 'green'; label: string }> = {
  idle: { color: 'gray', label: 'Idle' },
  running: { color: 'blue', label: 'Running' },
  error: { color: 'red', label: 'Error' },
  completed: { color: 'green', label: 'Completed' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge color={config.color} variant="soft">
      {config.label}
    </Badge>
  )
}
