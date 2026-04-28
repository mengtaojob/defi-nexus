import type { PortfolioPosition } from '../../types/portfolio'

interface PositionTableProps {
  positions: PortfolioPosition[]
}

export function PositionTable({ positions }: PositionTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position) => (
          <tr key={position.symbol}>
            <td>{position.symbol}</td>
            <td>{position.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
