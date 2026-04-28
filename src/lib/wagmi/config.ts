import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { env } from '../../config/env'
import { supportedWagmiChains } from './chains'

const walletConnectConnector =
  env.walletConnectProjectId.length > 0
    ? [walletConnect({ projectId: env.walletConnectProjectId })]
    : []

export const wagmiConfig = createConfig({
  chains: [...supportedWagmiChains],
  connectors: [injected(), ...walletConnectConnector],
  transports: {
    1: http(),
    42161: http(),
    8453: http(),
  },
})
