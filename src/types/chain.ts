export type SupportedChainId = 1 | 42161 | 8453

export interface SupportedChain {
  id: SupportedChainId
  name: 'Ethereum' | 'Arbitrum' | 'Base'
}
