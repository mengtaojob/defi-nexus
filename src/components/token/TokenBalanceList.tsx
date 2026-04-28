import type { TokenConfig } from '../../types/token'

interface TokenBalanceListProps {
  tokens: TokenConfig[]
}

export function TokenBalanceList({ tokens }: TokenBalanceListProps) {
  return (
    <ul>
      {tokens.map((token) => (
        <li key={`${token.chainId}-${token.address}`}>{token.symbol}</li>
      ))}
    </ul>
  )
}
