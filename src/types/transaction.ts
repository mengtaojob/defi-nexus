export type TxStatus = 'pending' | 'success' | 'failed'

export interface TrackedTransaction {
  hash: `0x${string}`
  status: TxStatus
  summary: string
  chainId: number
  createdAt: number
}
