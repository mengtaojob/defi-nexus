import { formatUnits, type Address } from 'viem'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from '../../abi/erc20'
import { TOKENS } from '../../config/tokens'
import type { TokenConfig } from '../../types/token'

interface PortfolioTokenBalance {
  token: TokenConfig
  rawBalance: bigint
  balance: string
  valueUsd: number
}

export function usePortfolioBalances(address?: Address, chainId?: number) {
  const tokens = chainId ? TOKENS.filter((token) => token.chainId === chainId) : []

  const contracts =
    address && chainId
      ? tokens.map((token) => ({
          chainId,
          abi: erc20Abi,
          address: token.address,
          functionName: 'balanceOf' as const,
          args: [address] as const,
        }))
      : []

  const query = useReadContracts({
    contracts,
    query: { enabled: Boolean(address && chainId && contracts.length > 0) },
  })

  const balances: PortfolioTokenBalance[] = tokens.map((token, index) => {
    const result = query.data?.[index]?.result
    const rawBalance = typeof result === 'bigint' ? result : 0n
    const balance = formatUnits(rawBalance, token.decimals)
    const valueUsd = Number(balance) * token.priceUsd

    return {
      token,
      rawBalance,
      balance,
      valueUsd,
    }
  })

  return {
    tokens,
    balances,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}
