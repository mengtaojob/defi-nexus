import { PortfolioSummary } from '../components/dashboard/PortfolioSummary'
import { PositionTable } from '../components/dashboard/PositionTable'
import { usePortfolio } from '../hooks/dashboard/usePortfolio'

export function DashboardPage() {
  const portfolio = usePortfolio()

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>
      <section className="page-card">
        <PortfolioSummary summary={portfolio} />
      </section>
      <section className="page-card">
        <PositionTable positions={portfolio.positions} />
      </section>
    </div>
  )
}
