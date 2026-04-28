import { Button } from '../common/Button'

interface ConnectWalletButtonProps {
  onClick?: () => void
}

export function ConnectWalletButton({ onClick }: ConnectWalletButtonProps) {
  return <Button onClick={onClick}>Connect Wallet</Button>
}
