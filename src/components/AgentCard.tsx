import { Card, Flex, Text, Heading, IconButton } from '@radix-ui/themes'
import { Play, Square, Trash2 } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { AgentTypeIcon } from './AgentTypeIcon'
import { agentCollection } from '../db/collections/agents'
import type { Agent } from '../db/schema'

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  const handleStart = () => {
    agentCollection.update(agent.id, (draft) => {
      draft.status = 'running'
      draft.updated_at = new Date().toISOString()
    })
  }

  const handleStop = () => {
    agentCollection.update(agent.id, (draft) => {
      draft.status = 'idle'
      draft.updated_at = new Date().toISOString()
    })
  }

  const handleDelete = () => {
    agentCollection.delete(agent.id)
  }

  const isRunning = agent.status === 'running'

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Flex gap="2" align="center">
            <AgentTypeIcon type={agent.type} />
            <Heading size="3">{agent.name}</Heading>
          </Flex>
          <StatusBadge status={agent.status} />
        </Flex>

        {agent.task && (
          <Text size="2" color="gray">
            {agent.task}
          </Text>
        )}

        {agent.result && agent.status === 'completed' && (
          <Card variant="surface">
            <Text size="2">{agent.result}</Text>
          </Card>
        )}

        {agent.error_message && agent.status === 'error' && (
          <Card variant="surface">
            <Text size="2" color="red">
              {agent.error_message}
            </Text>
          </Card>
        )}

        <Flex gap="2" justify="end">
          {isRunning ? (
            <IconButton variant="soft" color="gray" onClick={handleStop}>
              <Square size={16} />
            </IconButton>
          ) : (
            <IconButton variant="soft" color="blue" onClick={handleStart}>
              <Play size={16} />
            </IconButton>
          )}
          <IconButton variant="soft" color="red" onClick={handleDelete}>
            <Trash2 size={16} />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  )
}
