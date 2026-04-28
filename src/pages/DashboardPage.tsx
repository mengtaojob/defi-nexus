import { PortfolioSummary } from '../components/dashboard/PortfolioSummary'
import { PositionTable } from '../components/dashboard/PositionTable'
import { usePortfolio } from '../hooks/dashboard/usePortfolio'

export function DashboardPage() {
  const portfolio = usePortfolio()

  return (
    <div>
      <h1>Dashboard</h1>
      <PortfolioSummary summary={portfolio} />
      <PositionTable positions={portfolio.positions} />
    </div>
  )
}
