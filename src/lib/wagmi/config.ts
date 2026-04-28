import { createConfig, createStorage, http } from 'wagmi'
import { env } from '../../config/env'
import { createWalletConnectors } from './connectors'
import { supportedWagmiChains } from './chains'

export const wagmiConfig = createConfig({
  chains: [...supportedWagmiChains],
  connectors: createWalletConnectors(),
  ssr: false,
  storage: createStorage({ storage: window.localStorage }),
  transports: {
    1: http(env.rpcUrls[1]),
    42161: http(env.rpcUrls[42161]),
    8453: http(env.rpcUrls[8453]),
  },
})
