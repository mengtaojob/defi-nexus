import { formatUsd } from '../../lib/formatting/currency'
import type { PortfolioSummary as PortfolioSummaryType } from '../../types/portfolio'

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const positions = summary.positions.length

  return (
    <section className="portfolio-summary">
      <p className="portfolio-summary-label">Portfolio Value</p>
      <p className="portfolio-summary-total">{formatUsd(summary.totalValueUsd)}</p>
      <p className="portfolio-summary-meta">{positions} active position{positions === 1 ? '' : 's'}</p>
    </section>
  )
}
