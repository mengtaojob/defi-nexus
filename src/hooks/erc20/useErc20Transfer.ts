import { useWriteContract } from 'wagmi'

export function useErc20Transfer() {
  return useWriteContract()
}
