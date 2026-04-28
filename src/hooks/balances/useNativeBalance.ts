import type { Address } from 'viem'
import { useBalance } from 'wagmi'

export function useNativeBalance(address?: Address, chainId?: number) {
  return useBalance({
    address,
    chainId,
    query: { enabled: Boolean(address && chainId) },
  })
}
