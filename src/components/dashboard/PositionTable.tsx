import { formatUsd } from '../../lib/formatting/currency'
import { formatTokenAmount } from '../../lib/formatting/token'
import type { PortfolioPosition } from '../../types/portfolio'

interface PositionTableProps {
  positions: PortfolioPosition[]
}

export function PositionTable({ positions }: PositionTableProps) {
  return (
    <table className="position-table">
      <thead>
        <tr>
          <th>Token</th>
          <th>Balance</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.symbol}>
            <td>{position.symbol}</td>
            <td>{formatTokenAmount(position.balance)}</td>
            <td>{formatUsd(position.valueUsd ?? 0)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
