import { useAccount } from 'wagmi'
import { SUPPORTED_CHAINS } from '../../config/constants'

export function useChainGuard() {
  const { chainId } = useAccount()

  const isSupportedChain = chainId
    ? SUPPORTED_CHAINS.some((chain) => chain.id === chainId)
    : false

  return {
    chainId,
    isSupportedChain,
  }
}
