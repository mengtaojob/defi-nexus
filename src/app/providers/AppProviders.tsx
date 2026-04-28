import type { PropsWithChildren } from 'react'
import { QueryProvider } from './QueryProvider'
import { WagmiProvider } from './WagmiProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <WagmiProvider>{children}</WagmiProvider>
    </QueryProvider>
  )
}
