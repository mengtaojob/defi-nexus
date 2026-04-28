import type { PropsWithChildren } from 'react'
import { WagmiProvider as WagmiRootProvider } from 'wagmi'
import { wagmiConfig } from '../../lib/wagmi/config'

export function WagmiProvider({ children }: PropsWithChildren) {
  return <WagmiRootProvider config={wagmiConfig}>{children}</WagmiRootProvider>
}
