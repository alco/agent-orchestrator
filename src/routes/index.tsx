import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading } from '@radix-ui/themes'
import { DashboardStats } from '../components/DashboardStats'
import { StatusFilter } from '../components/StatusFilter'
import { CreateAgentDialog } from '../components/CreateAgentDialog'
import { AgentList } from '../components/AgentList'

export const Route = createFileRoute('/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <Container size="3" py="6">
      <Flex direction="column" gap="6">
        <Flex justify="between" align="center">
          <Heading size="7">Agent Orchestrator</Heading>
          <CreateAgentDialog />
        </Flex>

        <DashboardStats />

        <Flex justify="between" align="center" wrap="wrap" gap="3">
          <StatusFilter />
        </Flex>

        <AgentList />
      </Flex>
    </Container>
  )
}
