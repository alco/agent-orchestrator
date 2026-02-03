import { useLiveQuery, eq } from '@tanstack/react-db'
import { Grid, Text, Flex } from '@radix-ui/themes'
import { AgentCard } from './AgentCard'
import { agentCollection } from '../db/collections/agents'
import { useUIState } from '../hooks/useUIState'

export function AgentList() {
  const uiState = useUIState()
  const statusFilter = uiState.statusFilter

  const { data: agents } = useLiveQuery(
    (q) => {
      let query = q.from({ agent: agentCollection })
      if (statusFilter !== 'all') {
        query = query.where(({ agent }) => eq(agent.status, statusFilter))
      }
      return query.orderBy(({ agent }) => agent.created_at, 'desc')
    },
    [statusFilter]
  )

  if (!agents || agents.length === 0) {
    return (
      <Flex py="9" justify="center">
        <Text color="gray">
          {statusFilter === 'all'
            ? 'No agents yet. Create one to get started.'
            : `No ${statusFilter} agents.`}
        </Text>
      </Flex>
    )
  }

  return (
    <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </Grid>
  )
}
