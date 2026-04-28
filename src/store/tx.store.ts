import { create } from 'zustand'
import type { TrackedTransaction } from '../types/transaction'

interface TxState {
  transactions: TrackedTransaction[]
  addTransaction: (transaction: TrackedTransaction) => void
  updateTransactionStatus: (hash: `0x${string}`, status: TrackedTransaction['status']) => void
}

export const useTxStore = create<TxState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  updateTransactionStatus: (hash, status) =>
    set((state) => ({
      transactions: state.transactions.map((tx) => (tx.hash === hash ? { ...tx, status } : tx)),
    })),
}))
