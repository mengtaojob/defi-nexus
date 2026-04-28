export interface WalletConnectorDefinition {
  id: 'injected' | 'walletConnect'
  label: string
}

export const walletConnectorDefinitions: WalletConnectorDefinition[] = [
  { id: 'injected', label: 'Injected Wallet' },
  { id: 'walletConnect', label: 'WalletConnect' },
]
