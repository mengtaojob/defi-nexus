export const queryKeys = {
  nativeBalance: (chainId: number, address: string) => ['nativeBalance', chainId, address] as const,
  tokenBalance: (chainId: number, address: string, token: string) =>
    ['tokenBalance', chainId, address, token] as const,
  allowance: (chainId: number, owner: string, spender: string, token: string) =>
    ['allowance', chainId, owner, spender, token] as const,
  portfolio: (chainId: number, address: string) => ['portfolio', chainId, address] as const,
}
