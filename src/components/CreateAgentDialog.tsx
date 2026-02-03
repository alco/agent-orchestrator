import { Dialog, Button, Flex, Text, TextField, Select, TextArea } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { agentCollection } from '../db/collections/agents'
import { updateUIState } from '../db/collections/ui-state'
import { useUIState } from '../hooks/useUIState'
import { AGENT_TYPES, type AgentType } from '../db/schema'

export function CreateAgentDialog() {
  const uiState = useUIState()
  const isOpen = uiState.isCreateDialogOpen

  const setOpen = (open: boolean) => {
    updateUIState({ isCreateDialogOpen: open })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const name = formData.get('name') as string
    const type = formData.get('type') as AgentType
    const task = formData.get('task') as string
    const prompt = formData.get('prompt') as string

    agentCollection.insert({
      id: crypto.randomUUID(),
      name,
      type,
      status: 'idle',
      task: task || null,
      prompt: prompt || null,
      result: null,
      error_message: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    setOpen(false)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>
          <Plus size={16} />
          Create Agent
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Agent</Dialog.Title>
        <Dialog.Description size="2" color="gray">
          Configure a new AI agent to run tasks.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4" mt="4">
            <label>
              <Text size="2" weight="medium">
                Name
              </Text>
              <TextField.Root name="name" placeholder="My Agent" required mt="1" />
            </label>

            <label>
              <Text size="2" weight="medium">
                Type
              </Text>
              <Select.Root name="type" defaultValue="claude">
                <Select.Trigger mt="1" />
                <Select.Content>
                  {AGENT_TYPES.map((type) => (
                    <Select.Item key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </label>

            <label>
              <Text size="2" weight="medium">
                Task
              </Text>
              <TextField.Root name="task" placeholder="What should this agent do?" mt="1" />
            </label>

            <label>
              <Text size="2" weight="medium">
                Prompt
              </Text>
              <TextArea name="prompt" placeholder="System prompt for the agent..." rows={4} mt="1" />
            </label>

            <Flex gap="3" justify="end" mt="2">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit">Create</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
