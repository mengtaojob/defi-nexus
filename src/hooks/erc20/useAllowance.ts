import type { Address } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20Abi } from '../../abi/erc20'

export function useAllowance(
  token?: Address,
  owner?: Address,
  spender?: Address,
  chainId?: number,
) {
  return useReadContract({
    chainId,
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: owner && spender ? [owner, spender] : undefined,
    query: { enabled: Boolean(token && owner && spender && chainId) },
  })
}
