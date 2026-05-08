import { useAccount } from 'wagmi'
import { SUPPORTED_CHAINS } from '../../config/constants'

export function useChainGuard() {
  const { chainId, status } = useAccount()

  const isConnected = status === 'connected'
  const isSupportedChain = chainId
    ? SUPPORTED_CHAINS.some((chain) => chain.id === chainId)
    : false

  return {
    chainId,
    isConnected,
    isSupportedChain,
    canTransact: isConnected && isSupportedChain,
    guardMessage: !isConnected
      ? 'Connect wallet before sending transactions.'
      : !isSupportedChain
        ? 'Switch to a supported chain (Ethereum, Arbitrum, or Base) to continue.'
        : null,
  }
}
