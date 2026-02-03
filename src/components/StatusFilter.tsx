import { SegmentedControl } from '@radix-ui/themes'
import { updateUIState, type UIState } from '../db/collections/ui-state'
import { useUIState } from '../hooks/useUIState'
import { AGENT_STATUSES } from '../db/schema'

const filterOptions = ['all', ...AGENT_STATUSES] as const
type FilterValue = UIState['statusFilter']

export function StatusFilter() {
  const uiState = useUIState()
  const currentFilter = uiState.statusFilter

  const handleChange = (value: string) => {
    updateUIState({ statusFilter: value as FilterValue })
  }

  return (
    <SegmentedControl.Root value={currentFilter} onValueChange={handleChange}>
      {filterOptions.map((option) => (
        <SegmentedControl.Item key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  )
}
