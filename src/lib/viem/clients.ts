import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const defaultPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})
