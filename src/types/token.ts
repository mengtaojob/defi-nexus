import type { Address } from 'viem'
import type { SupportedChainId } from './chain'

export interface TokenConfig {
  chainId: SupportedChainId
  address: Address
  symbol: string
  name: string
  decimals: number
}
