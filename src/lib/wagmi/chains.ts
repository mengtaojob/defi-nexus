import { arbitrum, base, mainnet } from 'wagmi/chains'
import type { SupportedChainId } from '../../types/chain'

export const supportedWagmiChains = [mainnet, arbitrum, base] as const

export const chainById: Record<SupportedChainId, (typeof supportedWagmiChains)[number]> = {
  1: mainnet,
  42161: arbitrum,
  8453: base,
}
