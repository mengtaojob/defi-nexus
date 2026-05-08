import { create } from 'zustand'
import type { TrackedTransaction } from '../types/transaction'

interface TxState {
  transactions: TrackedTransaction[]
  addTransaction: (transaction: TrackedTransaction) => void
  updateTransactionStatus: (hash: `0x${string}`, status: TrackedTransaction['status']) => void
  dismissTransaction: (hash: `0x${string}`) => void
}

export const useTxStore = create<TxState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => {
      if (state.transactions.some((item) => item.hash === transaction.hash)) {
        return state
      }

      return { transactions: [transaction, ...state.transactions].slice(0, 10) }
    }),
  updateTransactionStatus: (hash, status) =>
    set((state) => ({
      transactions: state.transactions.map((tx) => (tx.hash === hash ? { ...tx, status } : tx)),
    })),
  dismissTransaction: (hash) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.hash !== hash),
    })),
}))
