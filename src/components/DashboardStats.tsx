import { useLiveQuery, eq, count } from '@tanstack/react-db'
import { Card, Flex, Text, Heading, Grid } from '@radix-ui/themes'
import { Bot, Play, CheckCircle, AlertCircle } from 'lucide-react'
import { agentCollection } from '../db/collections/agents'

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <Flex gap="3" align="center">
        <Flex
          align="center"
          justify="center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-2)',
            backgroundColor: color,
          }}
        >
          {icon}
        </Flex>
        <Flex direction="column">
          <Text size="2" color="gray">
            {label}
          </Text>
          <Heading size="5">{value}</Heading>
        </Flex>
      </Flex>
    </Card>
  )
}

export function DashboardStats() {
  const { data: totalResult } = useLiveQuery((q) =>
    q
      .from({ agent: agentCollection })
      .select(({ agent }) => ({ total: count(agent.id) }))
  )

  const { data: runningResult } = useLiveQuery((q) =>
    q
      .from({ agent: agentCollection })
      .where(({ agent }) => eq(agent.status, 'running'))
      .select(({ agent }) => ({ total: count(agent.id) }))
  )

  const { data: completedResult } = useLiveQuery((q) =>
    q
      .from({ agent: agentCollection })
      .where(({ agent }) => eq(agent.status, 'completed'))
      .select(({ agent }) => ({ total: count(agent.id) }))
  )

  const { data: errorResult } = useLiveQuery((q) =>
    q
      .from({ agent: agentCollection })
      .where(({ agent }) => eq(agent.status, 'error'))
      .select(({ agent }) => ({ total: count(agent.id) }))
  )

  const total = totalResult?.[0]?.total ?? 0
  const running = runningResult?.[0]?.total ?? 0
  const completed = completedResult?.[0]?.total ?? 0
  const errors = errorResult?.[0]?.total ?? 0

  return (
    <Grid columns={{ initial: '2', md: '4' }} gap="4">
      <StatCard
        label="Total Agents"
        value={total}
        icon={<Bot size={20} color="white" />}
        color="var(--accent-9)"
      />
      <StatCard
        label="Running"
        value={running}
        icon={<Play size={20} color="white" />}
        color="var(--blue-9)"
      />
      <StatCard
        label="Completed"
        value={completed}
        icon={<CheckCircle size={20} color="white" />}
        color="var(--green-9)"
      />
      <StatCard
        label="Errors"
        value={errors}
        icon={<AlertCircle size={20} color="white" />}
        color="var(--red-9)"
      />
    </Grid>
  )
}
