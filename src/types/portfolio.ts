export interface PortfolioPosition {
  symbol: string
  balance: string
  valueUsd?: number
  apy?: number
}

export interface PortfolioSummary {
  totalValueUsd: number
  positions: PortfolioPosition[]
}
