import { useMemo } from 'react'
import { useTxStore } from '../../store/tx.store'

const EXPLORERS: Record<number, string> = {
  1: 'https://etherscan.io/tx/',
  42161: 'https://arbiscan.io/tx/',
  8453: 'https://basescan.org/tx/',
}

function getStatusLabel(status: 'pending' | 'success' | 'failed'): string {
  if (status === 'pending') {
    return 'Pending'
  }

  if (status === 'success') {
    return 'Confirmed'
  }

  return 'Failed'
}

export function TxStatusToast() {
  const transactions = useTxStore((state) => state.transactions)
  const dismissTransaction = useTxStore((state) => state.dismissTransaction)

  const visible = useMemo(() => transactions.slice(0, 4), [transactions])

  if (visible.length === 0) {
    return null
  }

  return (
    <aside className="tx-toasts" aria-live="polite" aria-label="Transaction updates">
      {visible.map((tx) => {
        const link = EXPLORERS[tx.chainId] ? `${EXPLORERS[tx.chainId]}${tx.hash}` : null

        return (
          <article key={tx.hash} className={`tx-toast tx-toast-${tx.status}`}>
            <div className="tx-toast-row">
              <p className="tx-toast-title">{tx.summary}</p>
              <button className="tx-toast-dismiss" type="button" onClick={() => dismissTransaction(tx.hash)}>
                Dismiss
              </button>
            </div>
            <p className="tx-toast-status">{getStatusLabel(tx.status)}</p>
            {link ? (
              <a className="tx-toast-link" href={link} target="_blank" rel="noreferrer">
                View on explorer
              </a>
            ) : null}
          </article>
        )
      })}
    </aside>
  )
}
