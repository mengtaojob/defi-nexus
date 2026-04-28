import { useAccount } from 'wagmi'

export function useWallet() {
  const account = useAccount()

  return {
    ...account,
    isConnected: account.status === 'connected',
  }
}
