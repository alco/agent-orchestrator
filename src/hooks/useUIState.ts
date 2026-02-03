import { useSyncExternalStore } from 'react'
import { getUIState, subscribeToUIState, type UIState } from '../db/collections/ui-state'

export function useUIState(): UIState {
  return useSyncExternalStore(subscribeToUIState, getUIState, getUIState)
}
