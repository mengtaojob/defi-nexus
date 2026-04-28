export function formatTokenAmount(amount: string, decimals = 4): string {
  const parsed = Number(amount)

  if (Number.isNaN(parsed)) {
    return amount
  }

  return parsed.toFixed(decimals)
}
