import type { PortfolioSummary as PortfolioSummaryType } from '../../types/portfolio'

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  return <section>Total Value: {summary.totalValueUsd}</section>
}
