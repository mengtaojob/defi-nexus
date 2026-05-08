export function parseDecimals(value: string): number | null {
  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 255) {
    return null
  }

  return parsed
}

export function isPositiveAmount(value: string): boolean {
  if (!value) {
    return false
  }

  const parsed = Number(value)

  return Number.isFinite(parsed) && parsed > 0
}
