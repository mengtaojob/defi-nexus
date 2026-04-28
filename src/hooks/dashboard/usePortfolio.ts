import type { PortfolioSummary } from '../../types/portfolio'

const EMPTY_PORTFOLIO: PortfolioSummary = {
  totalValueUsd: 0,
  positions: [],
}

export function usePortfolio(): PortfolioSummary {
  return EMPTY_PORTFOLIO
}
