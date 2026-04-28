import { injected, walletConnect } from 'wagmi/connectors'
import { env } from '../../config/env'

export interface WalletConnectorDefinition {
  id: 'injected' | 'walletConnect'
  label: string
  enabled: boolean
}

export const walletConnectorDefinitions: WalletConnectorDefinition[] = [
  { id: 'injected', label: 'Browser Wallet', enabled: true },
  {
    id: 'walletConnect',
    label: 'WalletConnect',
    enabled: env.walletConnectProjectId.length > 0,
  },
]

export function createWalletConnectors() {
  const connectors = [
    injected({
      shimDisconnect: true,
    }),
  ]

  if (env.walletConnectProjectId.length > 0) {
    connectors.push(
      walletConnect({
        projectId: env.walletConnectProjectId,
        showQrModal: true,
      }),
    )
  }

  return connectors
}
