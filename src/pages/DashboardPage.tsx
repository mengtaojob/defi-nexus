import { ErrorBanner } from '../components/common/ErrorBanner'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { PortfolioSummary } from '../components/dashboard/PortfolioSummary'
import { PositionTable } from '../components/dashboard/PositionTable'
import { usePortfolio } from '../hooks/dashboard/usePortfolio'

export function DashboardPage() {
  const portfolio = usePortfolio()

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>
      {portfolio.isLoading ? <LoadingSpinner /> : null}
      {portfolio.isError ? <ErrorBanner message={portfolio.error?.message ?? 'Failed to load portfolio'} /> : null}

      {!portfolio.isLoading && !portfolio.isError ? (
        <>
          <section className="page-card">
            <PortfolioSummary summary={portfolio.summary} />
          </section>
          <section className="page-card">
            {portfolio.summary.positions.length > 0 ? (
              <PositionTable positions={portfolio.summary.positions} />
            ) : (
              <EmptyState message="No tracked balances found on this chain yet." />
            )}
          </section>
        </>
      ) : null}
    </div>
  )
}
