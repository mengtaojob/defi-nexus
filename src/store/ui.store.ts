import { create } from 'zustand'

interface UiState {
  selectedTokenAddress: string | null
  setSelectedTokenAddress: (address: string | null) => void
}

export const useUiStore = create<UiState>((set) => ({
  selectedTokenAddress: null,
  setSelectedTokenAddress: (selectedTokenAddress) => set({ selectedTokenAddress }),
}))
