export type AppErrorCode =
  | 'USER_REJECTED'
  | 'INSUFFICIENT_FUNDS'
  | 'CHAIN_MISMATCH'
  | 'CONTRACT_REVERT'
  | 'NETWORK_FAILURE'
  | 'UNKNOWN'

export class AppError extends Error {
  public readonly code: AppErrorCode

  constructor(code: AppErrorCode, message: string) {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}
