import { AppError } from './appError'

export function mapChainError(error: unknown): AppError {
  if (error instanceof Error) {
    return new AppError('UNKNOWN', error.message)
  }

  return new AppError('UNKNOWN', 'Unknown chain error')
}
