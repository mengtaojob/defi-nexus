import { arbitrum, base, mainnet } from 'wagmi/chains'

export const supportedWagmiChains = [mainnet, arbitrum, base] as const
