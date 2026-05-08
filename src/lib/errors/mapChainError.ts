import { AppError } from './appError'

function extractMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Unknown chain error'
  }

  const parts = [error.message]
  const maybeWithDetails = error as Error & { shortMessage?: string; details?: string; cause?: unknown }

  if (maybeWithDetails.shortMessage) {
    parts.unshift(maybeWithDetails.shortMessage)
  }

  if (maybeWithDetails.details) {
    parts.push(maybeWithDetails.details)
  }

  if (maybeWithDetails.cause instanceof Error) {
    parts.push(maybeWithDetails.cause.message)
  }

  return parts.join(' | ')
}

export function mapChainError(error: unknown): AppError {
  const message = extractMessage(error)
  const lower = message.toLowerCase()

  if (lower.includes('user rejected') || lower.includes('rejected the request') || lower.includes('action_rejected')) {
    return new AppError('USER_REJECTED', 'Transaction rejected in wallet.')
  }

  if (lower.includes('insufficient funds') || lower.includes('exceeds balance')) {
    return new AppError('INSUFFICIENT_FUNDS', 'Insufficient funds for this transaction.')
  }

  if (lower.includes('chain mismatch') || lower.includes('wrong network') || lower.includes('unsupported chain')) {
    return new AppError('CHAIN_MISMATCH', 'Connected network is not supported for this action.')
  }

  if (lower.includes('execution reverted') || lower.includes('revert')) {
    return new AppError('CONTRACT_REVERT', 'Contract call reverted. Verify inputs and token state.')
  }

  if (lower.includes('network error') || lower.includes('timeout') || lower.includes('fetch failed') || lower.includes('failed to fetch')) {
    return new AppError('NETWORK_FAILURE', 'Network request failed. Please retry.')
  }

  if (error instanceof Error) {
    return new AppError('UNKNOWN', error.message)
  }

  return new AppError('UNKNOWN', 'Unknown chain error')
}
