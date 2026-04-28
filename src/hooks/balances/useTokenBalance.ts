import type { Address } from 'viem'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from '../../abi/erc20'

export function useTokenBalance(address?: Address, token?: Address, chainId?: number) {
  return useReadContracts({
    contracts:
      address && token
        ? [
            {
              chainId,
              abi: erc20Abi,
              address: token,
              functionName: 'balanceOf',
              args: [address],
            },
          ]
        : [],
    query: { enabled: Boolean(address && token && chainId) },
  })
}
