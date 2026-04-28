import { ChainSwitcher } from '../components/wallet/ChainSwitcher'
import { ConnectWalletButton } from '../components/wallet/ConnectWalletButton'

export function WalletPage() {
  return (
    <div>
      <h1>Wallet</h1>
      <ConnectWalletButton />
      <ChainSwitcher />
    </div>
  )
}
