import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import type { PortfolioSummary } from '../../types/portfolio'
import { usePortfolioBalances } from '../balances/usePortfolioBalances'

const NATIVE_PRICES: Record<number, number> = {
  1: 3000,
  42161: 3000,
  8453: 3000,
}

export function usePortfolio() {
  const { address, chainId } = useAccount()
  const tokenBalances = usePortfolioBalances(address, chainId)

  const nativeBalance = useBalance({
    address,
    chainId,
    query: { enabled: Boolean(address && chainId) },
  })

  const summary: PortfolioSummary = useMemo(() => {
    const nativeRaw = nativeBalance.data?.value ?? 0n
    const nativeUnits = Number(formatUnits(nativeRaw, nativeBalance.data?.decimals ?? 18))
    const nativeValueUsd = nativeUnits * (chainId ? NATIVE_PRICES[chainId] ?? 0 : 0)

    const tokenPositions = tokenBalances.balances
      .filter((item) => item.rawBalance > 0n)
      .map((item) => ({
        symbol: item.token.symbol,
        balance: item.balance,
        valueUsd: item.valueUsd,
      }))

    const positions =
      nativeRaw > 0n
        ? [
            {
              symbol: nativeBalance.data?.symbol ?? 'ETH',
              balance: String(nativeUnits),
              valueUsd: nativeValueUsd,
            },
            ...tokenPositions,
          ]
        : tokenPositions

    const totalValueUsd = positions.reduce((sum, position) => sum + (position.valueUsd ?? 0), 0)

    return {
      totalValueUsd,
      positions,
    }
  }, [chainId, nativeBalance.data?.decimals, nativeBalance.data?.symbol, nativeBalance.data?.value, tokenBalances.balances])

  return {
    summary,
    isLoading: nativeBalance.isLoading || tokenBalances.isLoading,
    isError: nativeBalance.isError || tokenBalances.isError,
    error: nativeBalance.error ?? tokenBalances.error,
  }
}
