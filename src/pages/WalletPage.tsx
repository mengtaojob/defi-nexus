import { ChainSwitcher } from '../components/wallet/ChainSwitcher'
import { formatAddress } from '../lib/formatting/address'
import { useWallet } from '../hooks/wallet/useWallet'

export function WalletPage() {
  const wallet = useWallet()

  return (
    <div className="page">
      <h2 className="page-title">Wallet</h2>

      <section className="page-card page-actions wallet-page-panel">
        <div className="wallet-page-meta">
          <span className="wallet-page-label">Connection</span>
          <span className="wallet-page-value">
            {wallet.isConnected ? formatAddress(wallet.address ?? '') : 'Disconnected'}
          </span>
        </div>

        <div className="wallet-page-meta">
          <span className="wallet-page-label">Chain</span>
          <span className="wallet-page-value">{wallet.chainLabel}</span>
        </div>

        <ChainSwitcher />
      </section>

      <section className="page-card page-actions">
        {wallet.isConnected ? (
          <button className="wallet-action wallet-disconnect" type="button" onClick={() => wallet.disconnect()}>
            Disconnect Wallet
          </button>
        ) : (
          wallet.connectors.map((connector) => (
            <button
              key={connector.uid}
              className="wallet-action wallet-connect"
              type="button"
              onClick={() => wallet.connect({ connector })}
              disabled={wallet.isConnectPending}
            >
              Connect {connector.name}
            </button>
          ))
        )}
      </section>
    </div>
  )
}
