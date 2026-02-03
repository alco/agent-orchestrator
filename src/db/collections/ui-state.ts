// Simple UI state management using a singleton pattern
// This is ephemeral state that doesn't need sync/persistence

export interface UIState {
  id: string
  isCreateDialogOpen: boolean
  statusFilter: 'all' | 'idle' | 'running' | 'error' | 'completed'
}

// Global UI state
let uiState: UIState = {
  id: 'main',
  isCreateDialogOpen: false,
  statusFilter: 'all',
}

// Subscribers for reactive updates
type Subscriber = () => void
const subscribers = new Set<Subscriber>()

export function getUIState(): UIState {
  return uiState
}

export function updateUIState(updates: Partial<Omit<UIState, 'id'>>) {
  uiState = { ...uiState, ...updates }
  // Notify subscribers
  subscribers.forEach((sub) => sub())
}

export function subscribeToUIState(callback: Subscriber): () => void {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}
