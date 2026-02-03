import { Bot, Sparkles, Brain, Cpu, Wrench } from 'lucide-react'
import type { AgentType } from '../db/schema'

interface AgentTypeIconProps {
  type: AgentType
  size?: number
}

const iconConfig: Record<AgentType, { Icon: typeof Bot; color: string }> = {
  claude: { Icon: Sparkles, color: 'var(--orange-9)' },
  gpt: { Icon: Brain, color: 'var(--green-9)' },
  gemini: { Icon: Bot, color: 'var(--blue-9)' },
  llama: { Icon: Cpu, color: 'var(--purple-9)' },
  custom: { Icon: Wrench, color: 'var(--gray-9)' },
}

export function AgentTypeIcon({ type, size = 20 }: AgentTypeIconProps) {
  const { Icon, color } = iconConfig[type]
  return <Icon size={size} style={{ color }} />
}
