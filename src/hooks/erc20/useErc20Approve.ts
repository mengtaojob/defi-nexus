import { useWriteContract } from 'wagmi'

export function useErc20Approve() {
  return useWriteContract()
}
