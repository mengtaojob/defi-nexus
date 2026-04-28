import { ChainSwitcher } from '../components/wallet/ChainSwitcher'
import { ConnectWalletButton } from '../components/wallet/ConnectWalletButton'

export function WalletPage() {
  return (
    <div className="page">
      <h2 className="page-title">Wallet</h2>
      <section className="page-card page-actions">
        <ConnectWalletButton />
        <ChainSwitcher />
      </section>
    </div>
  )
}
